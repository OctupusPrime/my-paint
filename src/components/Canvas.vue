<template>
    <canvas class="canvas-paint" 
            id="paint" 
            :width="canvasWidht + 'px'" 
            :height="canvasHeight + 'px'"
            @mousedown="start($event)"
            @mousemove="drag($event)"
            @mouseup="end" />
</template>

<script>
let isClick = false;

let firstPos = {
    x: 0,
    y: 0
};
let secondPos = {
    x: 0,
    y: 0
};

export default {
    name: "Canvas",
    props: {
        lineWidth: Number,
        lineColor: String,
        isEraser: Boolean
    },
    data: () => ({
        canvasWidht: 0,
        canvasHeight: 0,
        ctx: 0
    }),
    methods: {
        start(e) {
            isClick = true;
            firstPos.x = e.pageX;
            firstPos.y = e.pageY;
            this.paint(firstPos, firstPos);
        },
        drag(e) {
            if (isClick) {
                secondPos.x = e.pageX;
                secondPos.y = e.pageY;

                this.paint(firstPos, secondPos);

                firstPos.x = e.pageX;
                firstPos.y = e.pageY;
            }
        },
        end() {
            isClick = false;
        },
        paint(firstPos, secondPos) {
            if (this.isEraser)
                this.ctx.strokeStyle = '#fff';
            else
                this.ctx.strokeStyle = this.lineColor;

            this.ctx.lineWidth = this.lineWidth;
            this.ctx.lineCap = 'round';

            this.ctx.beginPath();
            this.ctx.moveTo(firstPos.x, firstPos.y);
            this.ctx.lineTo(secondPos.x, secondPos.y);
            this.ctx.stroke();  
        },
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvasWidht, this.canvasHeight);
        }
    }, 
    created() {
        let self = this;

        self.canvasWidht = window.innerWidth;
        self.canvasHeight = window.innerHeight;
    },
    mounted() {
        let c = document.getElementById("paint");
        this.ctx = c.getContext("2d");
    }
}
</script>

<style scoped>
    #paint {
        background: #fff;
    }
</style>