import * as Phaser from "phaser";

// B1: โหลด Tiled map (JSON) → สร้าง layer → เดินชนกำแพง → กล้องตามตัว
// หมายเหตุ: tileset ที่นี่ generate ในโค้ด (สี่เหลี่ยมสี) เพื่อไม่ต้องมีไฟล์ .png
//          การทดสอบ pipeline Tiled + PNG จริง (คนไม่เขียนโค้ดทำแมปได้) = spike B2

export class WorldScene extends Phaser.Scene {
  private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("world");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/map.json");
  }

  create() {
    // --- generate tileset: 3 ช่อง 32px (grass / wall / accent) ---
    const g = this.add.graphics();
    const colors = [0x8ec07c, 0x3c3836, 0xd79921];
    colors.forEach((c, i) => {
      g.fillStyle(c).fillRect(i * 32, 0, 32, 32);
      g.lineStyle(1, 0x000000, 0.15).strokeRect(i * 32, 0, 32, 32);
    });
    g.generateTexture("tiles", 96, 32);
    g.clear();
    g.fillStyle(0x2563eb).fillCircle(8, 8, 8);
    g.generateTexture("player", 16, 16);
    g.destroy();

    // --- tilemap ---
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("tiles", "tiles")!;
    map.createLayer("ground", tileset, 0, 0);
    const walls = map.createLayer("walls", tileset, 0, 0)!;
    walls.setCollisionByExclusion([-1]); // ทุก tile ที่ไม่ว่าง = ชนได้

    // --- player + physics ---
    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, walls);

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    this.cursors = this.input.keyboard!.createCursorKeys();

    this.add
      .text(4, 4, "ลูกศรเดิน — ชนกำแพงเทาไม่ได้", { fontSize: "12px", color: "#000" })
      .setScrollFactor(0);
  }

  update() {
    const speed = 160;
    const b = this.player.body;
    b.setVelocity(0);
    if (this.cursors.left.isDown) b.setVelocityX(-speed);
    else if (this.cursors.right.isDown) b.setVelocityX(speed);
    if (this.cursors.up.isDown) b.setVelocityY(-speed);
    else if (this.cursors.down.isDown) b.setVelocityY(speed);
    b.velocity.normalize().scale(speed);
  }
}
