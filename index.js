let c;
let ctx;

let state = "ctp";
let frame = 1;

const matisz = {
    hp: 100,
    fight: function(){
        ctx.clearRect(0, 0, c.width, c.height);
        if (Math.random() < 0.4) {
            ctx.fillText("EGYES!", 10, 10);
            ctx.fillText(user.name + " -1 HP", c.width - 20, 10);
            user.hp--;
        } else {
            ctx.fillText("Oof, még egyeseket se tudok rendesen osztani.", 10, 10);
        }
        next = user;
    }
};
const user = {
    hp: 100,
    name: "",
    fight: function(){
        ctx.clearRect(0, 0, c.width, c.height);
        if (Math.random() < 0.4) {
            ctx.fillText("Na mi van Matiszzsuzsi, ülj le, 10es hit", 10, 10);
            ctx.fillText("Matisz -10 HP", c.width - 20, 10);
            matisz.hp -= 10;
        } else {
            ctx.fillText("Oof, még egyeseket se tudok rendesen osztani.", 10, 10);
        }
        next = matisz;
    }
};

window.onload = function () {
    c = document.getElementById("c");
    ctx = c.getContext("2d");
    ctx.scale(2, 2);

    ctx.font = "5px Sans-Serif";

    setInterval(function() {
        switch (state) {
            case "ctp":
                animaterun();
            break;
            case "fight":
                fight();
            break;
        }
    }, 50);

    c.onclick = function() {
        switch (state) {
            case "ctp":
                ctx.clearRect(0, 0, c.width, c.height);
                state = "fight";
                user.name = prompt("Mi a neved?");
                beginFight();
            break;
        }
    }; 
};

function animaterun() {
    ctx.clearRect(0, 0, c.width, c.height);
    const img = new Image();
    img.src = "./images/naruto" + frame + ".gif";
    img.onload = function() {
        ctx.drawImage(img, 10, 10, 100, 100);
    };

    ctx.fillText("KATTINTS A JÁTÉKHOZ", 10, 10);

    if (frame < 7) {
        frame++;
    } else {
        frame = 1;
    }
}

function beginFight () {
    console.log("Begun");
    ctx.fillText("Üdv a játékban, " + user.name, /*c.width - (ctx.measureText("Üdv a játékban, " + user.username).width / 2), c.height - (ctx.measureText("Üdv a játékban, " + user.username).height / 2)*/ 10, 10);
    setTimeout(function() {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.fillText("Az a feladatod, hogy győzd le Matiszt. Matisz egy Kraken. Szarul javított dogákat és egyeseket dobál rád.", /*c.width - (ctx.measureText("Az a feladatod, hogy győzd le Matiszt. Matisz egy Kraken. Szarul javított dogákat és egyeseket dobál rád.").width / 2), c.height - (ctx.measureText("Üdv a játékban, " + user.username).height / 2)*/ 10, 10);
    }, 1900);
    state = "fight";
}

function fight () {
    let next = user;
    let logs = [];
    let won = false;

    setInterval(function(){
        if (won !== true) {
            logs.push(next.fight());

            if (matisz.hp < 1) {
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.fillText(user.name + " nyert! Anyád Matisz háháhá", 10, 10);
                state = "end";
                won = true;
            }
            if (user.hp < 1) {
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.fillText("Matisz nyert? " + user.name + ", azt hittem te jobb vagy ennél.", 10, 10);
                state = "end";
                won = true;
            }
        }
    }, 1000);
}
