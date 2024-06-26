import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyInstance } from "fastify";
import { redis } from "../../lib/redis";

export async function getPoll(app: FastifyInstance) {
  app.get("/poll/:pollId", async (request, reply) => {
    const createPollParams = z.object({
      pollId: z.string().uuid(),
    });

    const { pollId } = createPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    if (!poll) {
      return reply.status(404).send({ message: "Poll not found" });
    }

    const result = await redis.zrange(pollId, 0, -1, "WITHSCORES");

    const votes = result.reduce(
      (obj, line, index) => {
        if (index % 2 === 0) {
          const score = result[index + 1];

          Object.assign(obj, { [line]: parseInt(score) });
        }
        return obj;
      },
      {} as Record<string, number>,
    );

    return reply.send({
      poll: {
        id: pollId,
        title: poll.title,
        options: poll.options.map((option) => ({
          id: option.id,
          title: option.title,
          votes: votes[option.id] || 0,
        })),
      },
    });
  });
}
