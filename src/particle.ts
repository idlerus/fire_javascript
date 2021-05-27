export default class particle
{
    public canvas: HTMLCanvasElement;
    public color: { r: number, g: number, b: number };

    private context: CanvasRenderingContext2D;
    public age: number;
    private lifespan: number;
    private position: {x: number, y: number} = {x: 0, y: 0};
    private direction: string;
    private directionSpeed: number = 2;
    private directionDeg: number = 0;
    private readonly speed: number;
    private size: number;
    private readonly sizeOriginal: number;
    private tail: {[id: number]: {x: number, y: number}}= {};
    private readonly tailLimit: number = 9;

    constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, color: { r: number, g: number, b: number })
    {
        this.canvas = canvas;
        this.context = context;
        this.color = color;
        this.lifespan = this.age = Math.floor(Math.random() * 500) + 100;
        this.position.x = (Math.random() * this.canvas.width);
        this.position.y = canvas.height;
        this.speed = Math.random() * 4 + 2;
        this.direction = 'left';
        this.sizeOriginal = this.size = (Math.random() * 4) + 2;
    }

    public draw()
    {
        this.drawTail();
        this.context.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+',1)';
        this.context.shadowColor = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+',1)';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowBlur = 10;
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.size, 0, Math.PI*2, false);
        this.context.fill();
        this.context.closePath();

        this.context.fillStyle = 'rgba('+this.color.r+10+','+this.color.g+10+','+this.color.b+10+',1)';
        this.context.shadowColor = 'rgba('+this.color.r+10+','+this.color.g+10+','+this.color.b+10+',1)';
        this.context.shadowOffsetX = 0;
        this.context.shadowOffsetY = 0;
        this.context.shadowBlur = 10;
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.size/2, 0, Math.PI*2, false);
        this.context.fill();
        this.context.closePath();

    }

    private drawTail()
    {
        for(let i in this.tail)
        {
            if(!this.tail.hasOwnProperty(i) || this.tail[i] === undefined || this.size-1 <= 0)
                continue;

            let brightness = (this.tailLimit - parseInt(i)) / 50;

            this.context.fillStyle = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+brightness+')';
            this.context.shadowColor = 'rgba('+this.color.r+','+this.color.g+','+this.color.b+','+brightness+')';
            this.context.shadowOffsetX = 0;
            this.context.shadowOffsetY = 0;
            this.context.shadowBlur = 10;
            this.context.beginPath();
            this.context.arc(this.tail[i].x, this.tail[i].y, this.size-1, 0, Math.PI*2, false);
            this.context.fill();
            this.context.closePath();
        }
    }

    public update()
    {
        this.age--;

        let size = this.sizeOriginal * (this.age / this.lifespan)
        if(size <= 0.5)
            this.size = 0.5;
        else
            this.size = size;

        this.move();
    }

    private move()
    {
        delete this.tail[this.tailLimit];
        for(let i = this.tailLimit; i >= 1; i--)
        {
            this.tail[i] = this.tail[i-1];
        }
        this.tail[1] = {x: this.position.x, y: this.position.y};

        if(this.directionDeg <= -60)
            this.toggleDirection();
        if(this.directionDeg >= 60)
            this.toggleDirection();

        if(Math.floor(Math.random() * 12) === 1)
        {
            this.toggleDirection();
        }

        if(this.direction === 'left')
            this.directionDeg -= this.directionSpeed;
        else
            this.directionDeg += this.directionSpeed;

        this.position.y += Math.sin((this.directionDeg - 90) * (Math.PI/180)) * this.speed;
        this.position.x += Math.cos((this.directionDeg - 90) * (Math.PI/180)) * this.speed;
    }

    private toggleDirection()
    {
        if(this.direction === 'left')
            this.direction = 'right';
        else
            this.direction = 'left';
    }
}