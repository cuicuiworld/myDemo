function fnRandom(e, t) {
    return parseInt((t - e) * Math.random() + e + 1)
}
function Round() {
    this.r = fnRandom(10, 15),
    this.diam = this.r * 2;
    var e = fnRandom(0, canvas.width - this.r);
    this.x = e < this.r ? this.r : e;
    var t = fnRandom(0, canvas.height - this.r);
    this.y = t < this.r ? this.r : t;
    var n = fnRandom(1, 2) / 10;
    this.speedX = fnRandom(0, 2) > 1 ? n : -n,
    this.speedY = fnRandom(0, 2) > 1 ? n : -n,
    this.color = "rgba(254,21,3,0.2)"
}
function initRound() {
    for (var e = 0; e < 20; e++) {
        var t = new Round;
        t.draw(),
        t.move(),
        allRound.push(t)
    }
}
function roundMove() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var e = 0; e < allRound.length; e++) {
        var t = allRound[e];
        t.draw(),
        t.move(),
        dxdy[e] = {
            dx: t.x,
            dy: t.y
        };
        var n = dxdy[e].dx
          , r = dxdy[e].dy;
        for (var i = 0; i < e; i++) {
            var s = dxdy[i].dx
              , o = dxdy[i].dy;
            l = Math.sqrt((n - s) * (n - s) + (r - o) * (r - o));
            var u = 1 / l * 10 - .009
              , a = u > .03 ? .03 : u;
            ctx.strokeStyle = "rgba(255,0,0," + a + ")",
            ctx.beginPath(),
            ctx.lineWidth = 2,
            ctx.moveTo(dxdy[e].dx, dxdy[e].dy),
            ctx.lineTo(dxdy[i].dx, dxdy[i].dy),
            ctx.closePath(),
            ctx.stroke()
        }
    }
    window.requestAnimationFrame(roundMove)
}
var w = window.innerWidth
  , h = window.innerHeight
  , canvas = document.getElementById("myCanvas")
  , ctx = canvas.getContext("2d");
canvas.width = w + 100,
canvas.height = h + 100,
Round.prototype.draw = function() {
    ctx.fillStyle = this.color,
    ctx.beginPath(),
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, !0),
    ctx.closePath(),
    ctx.fill()
}
,
Round.prototype.move = function() {
    this.x += this.speedX,
    this.x > canvas.width - this.r ? this.x = this.r : this.x < this.r && (this.x = canvas.width - this.r),
    this.y += this.speedY,
    this.y > canvas.height - this.r ? this.y = this.r : this.y < this.r && (this.y = canvas.height - this.r)
}
;
var allRound = [];
initRound();
var dxdy = [];
roundMove();
