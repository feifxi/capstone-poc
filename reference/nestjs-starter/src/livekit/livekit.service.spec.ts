import { Test } from "@nestjs/testing";
import { LivekitService } from "./livekit.service";

// DI ทำให้เทสได้โดยไม่ต้องแตะ LiveKit จริง — ตรงกับที่ spike C2 ต้องการ
// (ยิง 20 request พร้อมกันโดย mock dependency)
describe("LivekitService", () => {
  let service: LivekitService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LivekitService],
    }).compile();
    service = moduleRef.get(LivekitService);
  });

  it("speaker ได้ canPublish = true", async () => {
    const r = await service.issue({
      userId: "u1",
      role: "speaker",
      eventId: "e1",
      displayName: "A",
    });
    expect(r.canPublish).toBe(true);
    expect(typeof r.token).toBe("string");
  });

  it("participant ธรรมดา canPublish = false (โหมดผู้ชม)", async () => {
    const r = await service.issue({
      userId: "u2",
      role: "user",
      eventId: "e1",
      displayName: "B",
    });
    expect(r.canPublish).toBe(false);
  });
});
