import { Injectable } from "@nestjs/common";

// ⚠️ STUB — ของจริงคือ `extends PrismaClient` + connect ตอน onModuleInit
// ที่นี่เก็บใน memory เพื่อให้ starter รันได้โดยไม่ต้องมี Postgres
// จุดที่อยากให้ทีมเห็น: ทุก entity มี orgId/eventId เป็น first-class (context หัวข้อ 9)

export type EventRow = { id: string; orgId: string; name: string; isPublic: boolean };

@Injectable()
export class PrismaService {
  private events = new Map<string, EventRow>();

  event = {
    create: async (data: Omit<EventRow, "id">): Promise<EventRow> => {
      const row: EventRow = { id: crypto.randomUUID(), ...data };
      this.events.set(row.id, row);
      return row;
    },
    findMany: async (where: Partial<EventRow> = {}): Promise<EventRow[]> =>
      [...this.events.values()].filter((e) =>
        Object.entries(where).every(([k, v]) => (e as any)[k] === v),
      ),
    findFirst: async (where: Partial<EventRow>): Promise<EventRow | null> =>
      (await this.event.findMany(where))[0] ?? null,
  };
}
