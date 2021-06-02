import './styles/style.scss';
import particle from "./particle";


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
const particles: particle[] = [];

const maxParticles = 50;
const startParticles = 20;
const color = {r: 250, g: 60, b: 0};
//const color = {r: 78, g: 199, b: 213};

let backgroundLightSpeed = 10;
let backgroundDir = 1;
let backgroundLightDefault = canvas.height/2+800;
let backgroundLight = backgroundLightDefault;

canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;
canvas.style.position = 'absolute';
canvas.style.zIndex = '-1';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.right = '0';
canvas.style.bottom = '0';
document.body.appendChild(canvas);

for(let i = 0; i < startParticles; i++)
{
    particles.push(new particle(canvas, ctx, color));
}

background();

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background();
    for (let i in particles)
    {
        if(particles[i].age <= 0)
        {
            particles.splice(parseInt(i), 1);
        }
        else
        {
            particles[i].update();
            particles[i].draw();
        }
    }

    if(particles.length < maxParticles && Math.floor(Math.random() * 5) === 1)
    {
        particles.push(new particle(canvas, ctx, color));
    }
}

function background()
{
    if(backgroundDir == 1)
        backgroundLight += backgroundLightSpeed;
    else
        backgroundLight -= backgroundLightSpeed;

    if(backgroundLight > backgroundLightDefault+100)
    {
        backgroundDir = 0;
    }
    else if (backgroundLight < backgroundLightDefault-100)
    {
        backgroundDir = 1;
    }

    if(Math.floor(Math.random() * 5) === 1)
    {
        if(backgroundDir === 1)
            backgroundDir = 0;
        else
            backgroundDir = 1;
    }


    let grad = ctx.createRadialGradient(canvas.width/2, canvas.height*2, canvas.width, canvas.width/2, canvas.height*2, backgroundLight);
    grad.addColorStop(0, '#3e2018');
    //grad.addColorStop(1, '#130436');
    grad.addColorStop(1, '#5f3108');
    //grad.addColorStop(0, '#052e39');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function loop()
{
    draw()
    window.requestAnimationFrame(loop)
}
window.requestAnimationFrame(loop)