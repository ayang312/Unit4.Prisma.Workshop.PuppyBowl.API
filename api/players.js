const router = require("express").Router();
module.exports = router;

const prisma = require("../prisma");

// fetch players
router.get("/api/players", async (req, res, next) => {
  try {
    const players = await prisma.player.findMany();
    res.json(players);
  } catch (error) {
    next(error);
  }
});

// create player
router.post("/api/players", async (req, res, next) => {
  try {
    const { name, breed, status } = req.body;
    const player = await prisma.player.create({ data: name, breed, status });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

// find player by ID
router.get("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const player = await prisma.player.findUnique({ where: { id } });
    if (!player) {
      const error = new Errow("Player not found");
      error.status = 404;
      throw error;
    }
    res.json(player);
  } catch (error) {
    next(error);
  }
});

// update player by ID
router.put("/api/players/:id", async (req, res, next) => {
  try {
    const id = +req.params.id;
    const { status } = req.body;
    const player = await prisma.player.update({
      where: { id },
      data: { status },
    });
    res.json(player);
  } catch (error) {
    next(error);
  }
});

// delete player by ID
router.delete('/api/players/:id', async(req, res, next)=> {
try {
  const id = +req.params.id;
  const player = await prisma.player.delete({
    where: {id},
  });
  res.sendStatus(204);  
} catch (error) {
    next(error);
};
});