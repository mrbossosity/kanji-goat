import { ctx } from "../../functions/index.js";

// Default sprite
const sprite = new Image();
sprite.src = "/src/assets/images/cliff-platform-128-64.png";

// Collapse animation spritesheet
const collapseSprite = new Image();
collapseSprite.src = "/src/assets/images/cliff-platform-collapse.png";
const collapseMap = await fetch(
    "/src/assets/images/cliff-platform-collapse.json"
)
    .then((response) => response.json())
    .then((data) => {
        let mappedSprite = Object.values(data.frames).map((frame, index) => {
            return {
                x: frame.frame.x,
                y: frame.frame.y,
                w: frame.frame.w,
                h: frame.frame.h,
                duration: frame.duration,
                index: index,
            };
        });
        return mappedSprite;
    });

export default class CliffPlatform {
    constructor(
        x,
        y,
        width,
        height,
        gap,
        scoreText,
        collisionDetector,
        globalJump,
        pointsAwarded
    ) {
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._gap = gap;
        this._speedY = 0;

        // Hitbox markers
        this._left = this._x;
        this._right = this._x + this._width;
        this._top = this._y;
        this._bottom = this._y + this._height;
        this._acceptingCollisions = true;
        this._collision = false;

        // Jump animation
        this._isJumping = false;
        this._jumpDistance;
        this._jumpFrameCount;
        this._jumpFrame = 0;
        this._delta = 0;

        // Collapse animation
        this._isCollapsing = false;
        this._collapseTimeout = 60; // (60 fps = 1 second)
        this._collapseTimeoutFrame = 0;
        this._collapseTimer = 0;
        this._collapseFrame = 0;
        this._doNotDraw = false;

        // Points
        this._pointsAwarded = pointsAwarded;
        this._scoreText = scoreText;

        // globalUpdate.addEntity(this);
        globalJump.addEntity(this);
        collisionDetector.addEntity(this);
    }

    // Private
    _resetVariables() {
        // Scroll animation
        this._isJumping = false;
        this._jumpFrame = 0;
        this._delta = 0;
        // Collision detection
        this._acceptingCollisions = true;
        this._collision = false;
        // Reset collapse animation
        this._isCollapsing = false;
        this._collapseTimeoutFrame = 0;
        this._collapseFrame = 0;
        this._doNotDraw = false;
        this._pointsAwarded = false;
    }

    _respawn() {
        // New X position, Y position at top of canvas
        let randomX = Math.floor(Math.random() * (512 - this._width + 1));
        this._x = randomX;
        this._y = this._top - this._gap * 2 + this._delta;
        // Reset collision detection
        this._acceptingCollisions = true;
        this._collision = false;
        // Reset collapse animation
        this._isCollapsing = false;
        this._collapseTimeoutFrame = 0;
        this._collapseFrame = 0;
        this._doNotDraw = false;
        this._pointsAwarded = false;
    }

    _updateJump() {
        if (this._jumpFrame >= this._jumpFrameCount) {
            this._isJumping = false;
        }

        if (this._isJumping) {
            this._delta = this._jumpDistance / this._jumpFrameCount;
            this._y += this._delta;

            if (this._y + this._delta >= 512) {
                this._respawn();
            }

            this._jumpFrame++;
        }
    }

    _updateHitbox() {
        this._left = this._x;
        this._right = this._x + this._width;
        this._top = this._y;
        this._bottom = this._y + this._height;
    }

    _updateCollapse() {
        // Handle collapse timeout (frames prior to collapse animation)
        if (!this._isCollapsing) {
            this._collapseTimeoutFrame++;
            if (this._collapseTimeoutFrame == this._collapseTimeout) {
                this._isCollapsing = true;
                this._collapseTimeoutFrame = 0;
            }
            return;
        }

        // If on last frame, end animation
        if (this._collapseFrame + 1 == collapseMap.length) {
            this._isCollapsing = false;
            this._doNotDraw = true; // Don't render until sprite respawns
            this._acceptingCollisions = false; // Cause player to fall
            return;
        }

        // Else, advance timer and animation frame
        this._collapseTimer += 16; // 16ms = 60fps
        if (this._collapseTimer >= collapseMap[this._collapseFrame].duration) {
            this._collapseFrame++;
            this._collapseTimer = 0;
        }
    }

    // Public
    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get speedX() {
        return this._speedX;
    }

    set speedX(value) {
        this._speedX = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get speedY() {
        return this._speedY;
    }

    set speedY(value) {
        this._speedY = value;
    }

    get height() {
        return this._height;
    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    get top() {
        return this._top;
    }

    get bottom() {
        return this._bottom;
    }

    get delta() {
        return this._delta;
    }

    get acceptingCollisions() {
        return this._acceptingCollisions;
    }

    get collision() {
        return this._collision;
    }

    set collision(value) {
        this._collision = value;
    }

    init() {
        this._x = 128 + this._width / 2;
        this._y = 512 - this._height;
        this._resetVariables();
        this._pointsAwarded = true;
    }

    initAlt() {
        let randomX = Math.floor(Math.random() * (512 - this._width + 1));
        this._x = randomX;
        this._y = 512 - this._height - this._gap;
        this._resetVariables();
    }

    awardPoints() {
        if (!this._pointsAwarded) {
            this._scoreText.addPoints(10);
            this._pointsAwarded = true;
        }
    }

    jump(jumpDistance, jumpFrameCount) {
        this._isJumping = true;
        this._jumpDistance = jumpDistance;
        this._jumpFrameCount = jumpFrameCount;
        this._jumpFrame = 0;
    }

    update() {
        this._updateJump();
        this._updateHitbox();
        if (this._collision) this._updateCollapse();
    }

    render() {
        if (this._doNotDraw) return;
        if (this._isCollapsing) {
            ctx.drawImage(
                collapseSprite,
                collapseMap[this._collapseFrame].x,
                collapseMap[this._collapseFrame].y,
                collapseMap[this._collapseFrame].w,
                collapseMap[this._collapseFrame].h,
                this._x,
                this._y,
                collapseMap[this._collapseFrame].w,
                collapseMap[this._collapseFrame].h
            );
        } else {
            ctx.drawImage(sprite, this._x, this._y, this._width, this._height);
        }
    }
}
