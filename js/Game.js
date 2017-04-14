var game;
let yArrCount = 12;
var yArray = [yArrCount];
let height;
var deltaTime;
let animationSpeed = 5;
let gravity = 550;
let runSpeed = 425;
let shootSpeed = runSpeed * 2;
let shootAngleMultiply = 2.5;
let shootTime = 1000;
let jumpSpeed = 450;
let topSpeed = 600;
var playerBounce = 0.85;
var player1Score = 0;
var player2Score = 0;
var player1ShootTime = 0;
var player2ShootTime = 0;
var zoomTimeStamp = 0;
var canJump = 1;
var canJump2 = 1;
var oneGrounded = true;
var twoGrounded = true;
var firstTime = true;
var startX = 620;
var startXplay2 = 1.5;
var startY = 120;
let amplitude = 0.37;
let noizeScale = 0.45;
let numVert = 512;
let seed = 3;
var platforms;
var staticGround;
var staticGround2;
var staticCeiling;
var clouds;
var stars;
var balls;
var explodes;
var player1;
var player2;
var player;
var cyclopse;
var cursors;
var loop;
const worldWidth = 1500;
const xDivSize = 16 * 2.5;
const yDivSize = 80;
var scaleFactorOg;
let halfWorld = (worldWidth / xDivSize) / 2;
var playerType;
(function (playerType) {
    playerType[playerType["one"] = 1] = "one";
    playerType[playerType["two"] = 2] = "two";
})(playerType || (playerType = {}));
var generator;
function makeGround() {
    staticGround = game.add.sprite(0, game.world.height - 70, 'groundRound');
    staticGround2 = game.add.sprite(game.world.width, game.world.height - 70, 'groundRound');
    let staticScale = 20;
    staticGround.scale.set(staticScale, 1);
    staticGround2.scale.set(staticScale, 1);
    staticGround.checkWorldBounds = true;
    staticGround.events.onOutOfBounds.add(resetStatic, this);
    staticGround2.checkWorldBounds = true;
    staticGround2.events.onOutOfBounds.add(resetStatic, this);
    game.physics.arcade.enable(staticGround);
    game.physics.arcade.enable(staticGround2);
    staticGround.body.friction = new Phaser.Point(0, 0);
    staticGround.body.immovable = true;
    staticGround2.body.friction = new Phaser.Point(0, 0);
    staticGround2.body.immovable = true;
    staticGround2.tint = parseInt(getColor(200, 5, 5, 30), 16);
    var ledge = platforms.create(400, game.world.height - 400, 'ground1');
    ledge.checkWorldBounds = true;
    ledge.checkWorldBounds = true;
    ledge.events.onOutOfBounds.add(resetSprite, this);
    const mod = 160;
    let groundType = "";
    let groundName = "";
    for (var i = 0; i < game.world.width / xDivSize - halfWorld; i++) {
        for (var j = 0; j < game.world.height / yDivSize; j++) {
            var x = i + j * 32;
            var y = game.world.height - (generator.getVal(j) * game.camera.height * 1.5);
            var randomnumber = Math.random() * 2;
            if (randomnumber % 2 == 0) {
                groundType = 'ground2';
                groundName = 'ground2';
            }
            else {
                groundType = 'ground1';
                groundName = 'ground1';
            }
            if (groundType) {
                ledge.checkWorldBounds = true;
                ledge.spriteName = groundName;
                ledge.events.onOutOfBounds.add(resetSprite, this);
                ledge = platforms.create(x, y, groundType);
            }
        }
    }
    platforms.setAll('body.friction', new Phaser.Point(0, 0));
    platforms.setAll('body.immovable', true);
    console.log("total platforms " + platforms.countDead() + platforms.countLiving());
}
function createPlatform(group) {
}
function makeCloudsLoop() {
}
function makeClouds() {
    var ledge = clouds.create(400, 300, 'cloud1');
    for (var i = 0; i < 20; i++) {
        var randomnumber = Math.random();
        var halfX = game.world.width;
        if (i % 2 == 0)
            ledge = clouds.create(halfX * Math.random(), game.world.height * randomnumber, 'cloud1');
        else
            ledge = clouds.create(halfX * Math.random(), game.world.height * randomnumber, 'cloud2');
        ledge.checkWorldBounds = true;
        ledge.events.onOutOfBounds.add(resetSprite, this);
        randomnumber = Math.random();
        ledge.scale.set(1 - randomnumber + 0.5, 1 - randomnumber + 0.5);
        ledge.tint = getColor(200, 35, -30, 5);
    }
    clouds.setAll('body.friction', new Phaser.Point(0, 0));
    clouds.setAll('body.immovable', true);
}
function addPlayer() {
    player1 = game.add.sprite(startX, startY, 'dude1');
    game.physics.arcade.enable(player1);
    player1.body.bounce.y = playerBounce;
    player1.body.gravity.y = 500;
    player1.body.mass = 100;
    player1.animations.add('right', [0, 1, 2, 3, 5, 6], animationSpeed, true);
    if (firstTime == false) {
        player1.animations.play('right');
    }
}
function addPlayer2() {
    player2 = game.add.sprite(startX * startXplay2, startY, 'dude2');
    game.physics.arcade.enable(player2);
    player2.body.bounce.y = playerBounce;
    player2.body.gravity.y = 500;
    player2.body.mass = 100;
    player2.animations.add('right', [0, 1, 2, 3, 5, 6], animationSpeed, true);
    if (firstTime == false) {
        player2.animations.play('right');
    }
}
function addEitherPlayer(disSprite, spriteName, x, y, bounce, grav) {
    disSprite = game.add.sprite(x, y, spriteName);
    game.physics.arcade.enable(disSprite);
    disSprite.body.bounce.y = bounce;
    disSprite.body.gravity.y = grav;
    disSprite.body.mass = 100;
    disSprite.animations.add('right', [0, 1, 2, 3, 5, 6], animationSpeed, true);
    disSprite.animations.play('right');
}
function addCyclopse(x, y, speed) {
    cyclopse = game.add.sprite(x, y - 64, 'cyclopse');
    game.physics.arcade.enable(cyclopse);
    cyclopse.animations.add('talk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], 12, true);
    cyclopse.animations.play('talk');
    cyclopse.body.velocity.x = speed;
    cyclopse.checkWorldBounds = true;
    cyclopse.events.onOutOfBounds.add(resetSprite, this);
}
function addLazerOne(slayer) {
    if (game.time.now > player1ShootTime) {
        var star = stars.create(slayer.position.x + 64, slayer.position.y, 'star');
        star.body.gravity.y = 5;
        star.body.bounce.y = 0.5;
        star.body.mass = 0.1;
        star.checkWorldBounds = true;
        star.body.velocity.x = shootSpeed;
        star.body.velocity.y = slayer.body.velocity.y * shootAngleMultiply;
        star.events.onOutOfBounds.add(resetSprite, this);
        player1ShootTime = game.time.now + shootTime;
    }
}
function addStar2(slayer) {
    if (game.time.now > player2ShootTime) {
        var star = balls.create(slayer.position.x - 32, slayer.position.y, 'fireBall');
        star.body.gravity.y = 5;
        star.body.bounce.y = 0.5;
        star.body.mass = 0.1;
        star.checkWorldBounds = true;
        star.body.velocity.x = -shootSpeed - runSpeed;
        star.body.velocity.y = slayer.body.velocity.y * shootAngleMultiply;
        star.events.onOutOfBounds.add(resetSprite, this);
        player2ShootTime = game.time.now + shootTime;
    }
}
function setupInvader(invader) {
    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');
}
function setupCloud(invader) {
    invader.body.velocity.x = -runSpeed / (2 * Math.random() + 3);
}
function startBiatch() {
    platforms.setAll('body.velocity.x', -runSpeed);
    staticCeiling.setAll('body.velocity.x', -runSpeed);
    staticGround.body.velocity.x = -runSpeed;
    staticGround2.body.velocity.x = -runSpeed;
    clouds.forEach(setupCloud, this);
    player2.animations.play('right');
    player1.animations.play('right');
}
let incrX = 0;
let xReledgeOffset = 256;
function reLedge(group, x) {
    if (group.countDead() > group.countLiving()) {
        for (let i = 1; i <= group.countDead(); i++) {
            let checkLedge = group.getAt(group.countLiving() - 1);
            let checkX = checkLedge.body.position.x;
            if (x < checkX)
                x = checkX;
            let ledge = group.getFirstDead();
            if (ledge != null) {
                var y = generator.getVal(incrX);
                const disY = game.world.height - (y * game.camera.height * 1.65);
                ledge.reset(i * xReledgeOffset + x, disY);
                ledge.body.velocity.x = -runSpeed;
                incrX++;
            }
        }
    }
}
function reCloud() {
    var ledge = clouds.getFirstDead();
    if (ledge != null) {
        var randomnumber = Math.random();
        var halfX = game.world.width;
        ledge.reset(halfX, game.world.height * randomnumber);
        randomnumber = Math.random();
        ledge.body.velocity.x = -runSpeed / (2 * randomnumber + 3);
        ledge.scale.set(1 - randomnumber + 0.5, 1 - randomnumber + 0.5);
        ledge.tint = getColor(200, 35, -30, 5);
    }
    clouds.sort('scale', Phaser.Group.SORT_ASCENDING);
}
function resetSprite(ledge) {
    ledge.kill();
}
function resetStatic(obj) {
    obj.position.x = game.world.width;
}
function resetPlayerX() {
    if (player1.body.position.x < startX - 5) {
        player1.body.velocity.x = runSpeed / 2;
    }
    if (player1.body.position.x > startX + 5) {
        player1.body.velocity.x = -runSpeed / 2;
    }
    else if (player1.body.position.x == startX) {
        player1.body.velocity.x = 0;
    }
}
function resetPlayer2X() {
    if (player2.body.position.x < (startX * startXplay2) - 5) {
        player2.body.velocity.x = runSpeed / 2;
    }
    if (player2.body.position.x > (startX * startXplay2) + 5) {
        player2.body.velocity.x = -runSpeed / 2;
    }
    else if (player2.body.position.x == (startX * startXplay2)) {
        player2.body.velocity.x = 0;
    }
}
function ballStarCollide(ball, star) {
    ball.kill();
    star.kill();
    var explosion = explodes.getFirstExists(false);
    explosion.reset(ball.body.x, ball.body.y);
    explosion.play('kaboom', 30, false);
    explosion.body.velocity.x = -runSpeed;
}
function gofull() {
    if (game.scale.isFullScreen) {
    }
    else {
        game.scale.startFullScreen(false);
        startBiatch();
    }
}
class SimpleGame {
    constructor() {
        
        var width = document.getElementById("content").clientWidth;
        var height = width * (600/1000);
        game = new Phaser.Game(width, height, Phaser.AUTO, 'gamecontent', { preload: this.preload,
            create: this.create,
            update: this.update,
            render: this.render,
            onLeftTrigger: this.onLeftTrigger,
            onRightTrigger: this.onRightTrigger,
            addButtons: this.addButtons, });
    }
    preload() {
        game.load.image('logo', "/assets/logo.png");
        game.stage.backgroundColor = 0x5660e9;
        game.load.image('sky', '/assets/sky.png');
        game.load.image('ground', '/assets/platform.png');
        game.load.image('ground1', '/assets/SynthScapeGround.png');
        game.load.image('ground2', '/assets/SynthScapeGround1.png');
        game.load.image('ground3', '/assets/SynthScapeGround3.png');
        game.load.image('ground4', '/assets/SynthScapeGround4.png');
        game.load.image('groundRound', '/assets/SynthScapeGroundRound.png');
        game.load.image('star', '/assets/purpleLazer.png');
        game.load.image('back', '/assets/swirl1.jpg');
        game.load.image('loop', '/assets/glass.png');
        game.load.image('fireBall', '/assets/lazer.png');
        game.load.image('cloud1', '/assets/cloud1.png');
        game.load.image('cloud2', '/assets/ground2.png');
        game.load.image('cloud3', '/assets/cloud3.png');
        game.load.image('cloud4', '/assets/cloud4.png');
        game.load.image('star1', '/assets/star1.png');
        game.load.spritesheet('dude1', '/assets/synthBot1.png', 32, 32);
        game.load.spritesheet('dude2', '/assets/synthBot2.png', 32, 32);
        game.load.spritesheet('kaboom', '/assets/explosion.png', 64, 64);
        game.load.spritesheet('cyclopse', '/assets/cyclopse_talking12fps.png', 64, 64);
    }
    render() {
        var numberLive = balls.countLiving();
        var numberDead = stars.countLiving();
        game.debug.text("player one: " + player1Score + " player two: " + player2Score, 16, 16);
        game.debug.text("balls: " + numberLive + " stars: " + numberDead, 16, 32);
        game.debug.cameraInfo(game.camera, 500, 32);
        game.debug.text("ledgecound dead: " + platforms.countDead(), 16, 48);
        game.debug.text("platform live: " + platforms.countLiving(), 16, 64);
        game.debug.text("Noise scale: " + generator.getScale(), 16, 64 + 16);
        game.debug.text("Amp scale: " + generator.getAmplitude(), 16, 64 + 32);
    }
    create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 1700, 600);
        game.input.gamepad.start();
        this.pad = game.input.gamepad.pad1;
        this.pad.addCallbacks(this, { onConnect: this.addButtons });
        game.input.onDown.add(gofull, this);
        game.input.addPointer();
        game.input.addPointer();
        game.input.addPointer();
        if (!game.device.desktop) {
            game.input.onDown.add(gofull, this);
        }
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        stars = game.add.group();
        stars.enableBody = true;
        balls = game.add.group();
        balls.enableBody = true;
        clouds = game.add.group();
        clouds.enableBody = true;
        platforms = game.add.group();
        platforms.enableBody = true;
        staticCeiling = game.add.group();
        staticCeiling.enableBody = true;
        height = game.world.height;
        generator = Simple1DNoise(game, 256);
        makeGround();
        makeClouds();
        addPlayer();
        var x2 = (startX * startXplay2);
        addPlayer2();
        scaleFactorOg = Math.sqrt(Math.pow(startX - startX * startXplay2, 2));
        console.log("OG scale: " + scaleFactorOg);
        firstTime = false;
        cursors = game.input.keyboard.createCursorKeys();
        explodes = game.add.group();
        explodes.enableBody = true;
        explodes.createMultiple(15, 'kaboom');
        explodes.forEach(setupInvader, this);
        for (var i = 0; i <= yArrCount; i++) {
            yArray[i] = game.rnd.integerInRange(0, game.world.height);
        }
    }
    addButtons() {
        this.leftTrigger = this.pad.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
        this.rightTrigger = this.pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
        this.leftTrigger.onDown.add(this.onLeftTrigger);
        this.leftTrigger.onUp.add(this.onLeftTrigger);
        this.leftTrigger.onFloat.add(this.onLeftTrigger);
    }
    onLeftTrigger(player, balls) {
        balls.kill();
        player1Score++;
        var explosion = explodes.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false);
    }
    onRightTrigger(player, balls) {
        balls.kill();
        player2Score++;
        var explosion = explodes.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false);
    }
    update() {
        var p1Y = player1.position.y;
        var p1X = player1.position.x;
        var p2Y = player2.position.y;
        var p2X = player2.position.x;
        var pointer1X = game.input.pointer1.screenX;
        var pointer1Y = game.input.pointer1.screenY;
        var pointer2X = game.input.pointer2.screenX;
        var pointer2Y = game.input.pointer2.screenY;
        var camHeight = game.camera.height;
        var camWidth = game.camera.width;
        var zoomTimeOffset = 1200;
        var scaleTime = 450;
        var scaleDiff = camHeight / 5;
        var totsDis = Math.abs(p2Y - p1Y) / 2;
        var totsDisX = Math.abs(p2X - p1X) / 2;
        var totsScaledDis = Math.abs(p2Y * scaleFactor - p1Y * scaleFactor) / 2;
        var scaleFactor = scaleFactorOg / Math.sqrt(Math.pow(totsDisX, 2) + Math.pow(totsDis, 2));
        var play1TotsX = p1X + totsDisX;
        var play1TotsY = p1Y + totsDis;
        var play2TotsY = p2Y + totsDis;
        game.physics.arcade.collide(platforms, player1);
        game.physics.arcade.collide(platforms, player2);
        game.physics.arcade.collide(platforms, stars);
        game.physics.arcade.collide(platforms, balls);
        game.physics.arcade.collide(staticCeiling, player1);
        game.physics.arcade.collide(staticCeiling, player2);
        game.physics.arcade.collide(staticCeiling, stars);
        game.physics.arcade.collide(staticCeiling, balls);
        game.physics.arcade.collide(staticGround, player1);
        game.physics.arcade.collide(staticGround, player2);
        game.physics.arcade.collide(staticGround, stars);
        game.physics.arcade.collide(staticGround, balls);
        game.physics.arcade.collide(staticGround2, player1);
        game.physics.arcade.collide(staticGround2, player2);
        game.physics.arcade.collide(staticGround2, stars);
        game.physics.arcade.collide(staticGround2, balls);
        game.physics.arcade.overlap(balls, player1, this.onRightTrigger, null, this);
        game.physics.arcade.overlap(stars, player2, this.onLeftTrigger, null, this);
        game.physics.arcade.overlap(balls, stars, ballStarCollide, null, this);
        if (player1.body.velocity.y < -topSpeed) {
            player1.body.velocity.y = 0;
        }
        if (player2.body.velocity.y < -topSpeed) {
            player2.body.velocity.y = 0;
        }
        player1.body.velocity.x = 0;
        player2.body.velocity.x = 0;
        reLedge(platforms, game.camera.width + 128);
        reCloud();
        resetPlayerX();
        resetPlayer2X();
        if (game.input.keyboard.downDuration(Phaser.Keyboard.R, 5)) {
            generator.setScale(scale += 0.05);
        }
        if (game.input.keyboard.downDuration(Phaser.Keyboard.E, 5)) {
            generator.setScale(scale -= 0.05);
        }
        if (game.input.keyboard.downDuration(Phaser.Keyboard.T, 5)) {
            generator.setAmplitude(amplitude += 0.05);
        }
        if (game.input.keyboard.downDuration(Phaser.Keyboard.Y, 5)) {
            generator.setAmplitude(amplitude -= 0.05);
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.ONE)) { }
        if (game.input.keyboard.isDown(Phaser.Keyboard.T)) {
            toggleCameraBounds();
        }
        if (game.input.keyboard.downDuration(Phaser.Keyboard.D, 50)
            || (game.input.pointer1.isDown
                && pointer1X <= camWidth / 2
                && pointer1Y <= camHeight / 2)
            || (game.input.pointer2.isDown
                && pointer2X <= camWidth / 2
                && pointer2Y <= camHeight / 2)) {
            addLazerOne(player1);
        }
        if (game.input.keyboard.downDuration(Phaser.Keyboard.LEFT, 50)
            || (game.input.pointer1.isDown
                && pointer1X >= camWidth / 2
                && pointer1Y <= camHeight / 2)
            || (game.input.pointer2.isDown
                && pointer2X >= camWidth / 2
                && pointer2Y <= camHeight / 2)) {
            addStar2(player2);
        }
        if ((game.input.keyboard.isDown(Phaser.Keyboard.W)
            || (game.input.pointer1.isDown
                && pointer1X <= camWidth / 2
                && pointer1Y >= camHeight / 2)
            || (game.input.pointer2.isDown
                && pointer2X <= camWidth / 2
                && pointer2Y >= camHeight / 2))
            && canJump >= 1) {
            player1.body.velocity.y = -jumpSpeed;
            canJump--;
            oneGrounded = false;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            player1.body.velocity.y = jumpSpeed;
        }
        if ((cursors.up.isDown
            || (game.input.pointer1.isDown
                && pointer1X >= camWidth / 2
                && pointer1Y >= camHeight / 2)
            || (game.input.pointer2.isDown
                && pointer2X >= camWidth / 2
                && pointer2Y >= camHeight / 2))
            && canJump2 >= 1) {
            player2.body.velocity.y = -jumpSpeed;
            canJump2--;
            twoGrounded = false;
        }
        if (player1.body.position.y >= game.world.height || player1.body.position.x <= 0) {
            player1.destroy();
            addPlayer();
        }
        if (player2.body.position.y >= game.world.height || player2.body.position.x <= 0) {
            player2.destroy();
            addPlayer2();
        }
        if (player1.body.touching.down && !oneGrounded) {
            canJump++;
            oneGrounded = true;
        }
        if (player2.body.touching.down && !twoGrounded) {
            canJump2++;
            twoGrounded = true;
        }
        if (cursors.down.isDown) {
            player2.body.velocity.y = jumpSpeed;
        }
        else if (cursors.right.isDown) {
            startBiatch();
        }
        else {
        }
        if (p1Y >= p2Y) {
            game.camera.focusOnXY(p1X + totsDisX, (p2Y + totsDis));
        }
        else if (p1Y < p2Y) {
            game.camera.focusOnXY(p1X + totsDisX, p1Y + totsDis);
        }
    }
}
function toggleCameraBounds() {
    if (game.world.camera.checkBounds != null) {
        console.log("bounds!? " + game.world.camera.checkBounds);
        game.world.camera.checkBounds = null;
    }
    else {
        game.world.camera.setBoundsToWorld();
        console.log("bounds!?tt " + game.world.camera.checkBounds);
    }
}
window.onload = () => {
    var game = new SimpleGame();
};
function getColor(base = 150, rAdd = 0, gAdd = 0, bAdd = 0) {
    if (base > 200)
        base = 200;
    let r = Math.floor(Math.random() * (55 + rAdd) + base);
    let g = Math.floor(Math.random() * (55 + gAdd) + base);
    let b = Math.floor(Math.random() * (55 + bAdd) + base);
    if (r > 255)
        r = 255;
    if (g > 255)
        g = 255;
    if (b > 255)
        b = 255;
    return "0x" + r.toString(16) + g.toString(16) + b.toString(16);
}
var scale = noizeScale;
function Simple1DNoise(game, platforms) {
    var MAX_VERTICES = numVert;
    var MAX_VERTICES_MASK = MAX_VERTICES - 1;
    var amplitude = 0.55;
    var scale = 0.35;
    var r = [];
    for (var i = 0; i < MAX_VERTICES; ++i) {
        r.push(rand() % 1);
    }
    var getVal = function (x) {
        var scaledX = x * scale;
        var xFloor = Math.floor(scaledX);
        var t = scaledX - xFloor;
        var tRemapSmoothstep = t * t * (3 - 2 * t);
        var xMin = xFloor & MAX_VERTICES_MASK;
        var xMax = (xMin + 1) & MAX_VERTICES_MASK;
        var y = lerp(r[xMin], r[xMax], tRemapSmoothstep);
        return y * amplitude;
    };
    var lerp = function (a, b, t) {
        return a * (1 - t) + b * t;
    };
    return {
        getVal: getVal,
        setAmplitude: function (newAmplitude) {
            amplitude = newAmplitude;
        },
        getAmplitude: function () {
            return amplitude;
        },
        setScale: function (newScale) {
            scale = newScale;
        },
        getScale: function () {
            return scale;
        }
    };
}
;
function rand() {
    const M = 2147483647;
    const A = 48271;
    const Q = (M / A);
    const R = (M % A);
    seed = A * (seed % Q) - R * (seed / Q);
    if (seed <= 0)
        seed += M;
    return seed;
}
