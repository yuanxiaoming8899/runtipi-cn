import { z } from 'zod';

export const systemInfoSchema = z.object({
  diskUsed: z.number(),
  diskSize: z.number(),
  percentUsed: z.number(),
  cpuLoad: z.number(),
  memoryTotal: z.number(),
  percentUsedMemory: z.number(),
});

export const socketEventSchema = z.union([
  z.object({
    type: z.literal('system_info'),
    event: z.literal('status_change'),
    data: systemInfoSchema,
  }),
  z.object({
    type: z.literal('app'),
    event: z.union([
      z.literal('status_change'),
      z.literal('install_success'),
      z.literal('install_error'),
      z.literal('uninstall_success'),
      z.literal('uninstall_error'),
      z.literal('reset_success'),
      z.literal('reset_error'),
      z.literal('update_success'),
      z.literal('update_error'),
      z.literal('start_success'),
      z.literal('start_error'),
      z.literal('stop_success'),
      z.literal('stop_error'),
      z.literal('generate_env_success'),
      z.literal('generate_env_error'),
    ]),
    data: z.object({
      appId: z.string(),
      error: z.string().optional(),
    }),
  }),
  z.object({
    type: z.literal('dummy'),
    event: z.literal('dummy_event'),
    data: z.object({
      dummy: z.string(),
    }),
  }),
]);

export type SocketEvent = z.infer<typeof socketEventSchema>;
