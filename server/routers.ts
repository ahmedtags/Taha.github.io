import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { PROJECTS } from "../client/src/data/projects";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Projects management
  projects: router({
    // Get all projects (public query)
    list: publicProcedure.query(() => {
      return PROJECTS;
    }),
    
    // Get a single project by ID (public query)
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(({ input }) => {
        return PROJECTS.find(p => p.id === input.id) || null;
      }),
  }),
});

export type AppRouter = typeof appRouter;
