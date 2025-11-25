import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import * as db from "../db";
import { storagePut } from "../storage";

export const attachmentsRouter = router({
  // Upload attachment for a post
  upload: protectedProcedure
    .input(
      z.object({
        postId: z.number(),
        filename: z.string(),
        base64Data: z.string(),
        mimeType: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Decode base64
      const buffer = Buffer.from(input.base64Data, "base64");
      const fileSize = buffer.length;
      
      // Validate file size (max 10MB)
      if (fileSize > 10 * 1024 * 1024) {
        throw new Error("File size exceeds 10MB limit");
      }
      
      // Generate unique file key
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const fileKey = `attachments/${ctx.user.id}/${input.postId}/${timestamp}-${randomSuffix}-${input.filename}`;
      
      // Upload to S3
      const { url } = await storagePut(fileKey, buffer, input.mimeType);
      
      // Save to database
      await db.createAttachment({
        postId: input.postId,
        userId: ctx.user.id,
        filename: input.filename,
        fileKey,
        fileUrl: url,
        mimeType: input.mimeType,
        fileSize,
      });
      
      return { url, fileKey, fileSize };
    }),

  // Get attachments for a post
  getByPost: protectedProcedure
    .input(z.object({ postId: z.number() }))
    .query(async ({ input }) => {
      const attachments = await db.getAttachmentsByPost(input.postId);
      return attachments;
    }),
});
