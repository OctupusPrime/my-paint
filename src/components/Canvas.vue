<template>
    <canvas id="paint" 
            :width="canvasWidht + 'px'" 
            :height="canvasHeight + 'px'"
            :class="{'eraser': isEraser}"
            @mousedown="start($event)"
            @mousemove="drag($event)"
            @mouseup="end" 

            @touchstart="start($event.touches[0])"
            @touchmove="drag($event.touches[0])"
            @touchend="end"/>
</template>

<script>
import { mapActions } from 'vuex';

let isClick = false;

let isLoaded = false;

let firstPos = {
    x: 0,
    y: 0
};
let secondPos = {
    x: 0,
    y: 0
};

let paintArr;

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
        ctx: 0,
    }),
    methods: {
        ...mapActions(['setNewLine', 'clearPaint']),
        start(e) {
            if (isLoaded) {
                isClick = true;
                firstPos.x = e.pageX;
                firstPos.y = e.pageY;

                secondPos.x = e.pageX;
                secondPos.y = e.pageY;

                this.saveToStore();
            }
        },
        drag(e) {
            if (isClick) {
                firstPos.x = e.pageX;
                firstPos.y = e.pageY;

                this.saveToStore();

                secondPos.x = e.pageX;
                secondPos.y = e.pageY;
            }
        },
        end() {
            isClick = false;
        },
        paint(firstPos, secondPos, lineWidth, lineColor) {
            this.ctx.strokeStyle = lineColor;
            this.ctx.lineWidth = lineWidth;
            this.ctx.lineCap = 'round';

            this.ctx.beginPath();
            this.ctx.moveTo(firstPos.x, firstPos.y);
            this.ctx.lineTo(secondPos.x, secondPos.y);
            this.ctx.stroke();  
        },
        clear() {
            this.ctx.clearRect(0, 0, this.canvasWidht, this.canvasHeight);
            this.clearPaint();
            paintArr = [];
        },
        replay() {
            isLoaded = false;
            this.ctx.clearRect(0, 0, this.canvasWidht, this.canvasHeight);
            this.build();
        },
        saveToStore() {
            if (this.isEraser) {
                this.paint(firstPos, secondPos, this.lineWidth, "#fff");

                this.setNewLine({
                    firstPos: Object.assign({}, firstPos), 
                    secondPos: Object.assign({}, secondPos), 
                    lineWidth: this.lineWidth, 
                    lineColor: '#fff'
                });
            }
            else {
                this.paint(firstPos, secondPos, this.lineWidth, this.lineColor);

                this.setNewLine({
                    firstPos: Object.assign({}, firstPos), 
                    secondPos: Object.assign({}, secondPos), 
                    lineWidth: this.lineWidth, 
                    lineColor: this.lineColor
                });
            }         
        },
        build() {
            paintArr = this.$store.getters.getPaintArr;

            if (paintArr.length === 0)
                isLoaded = true;

            setTimeout(function(){
                for(let i = 0; i < paintArr.length; i++){
                    const {firstPos, secondPos, lineWidth, lineColor} = paintArr[i];
                    setTimeout(function(){
                        this.paint(firstPos, secondPos, lineWidth, lineColor);
                    }.bind(this),i * 7)
                }    
                setTimeout(function(){
                    isLoaded = true;
                },(paintArr.length - 1) * 7 + 400)
            }.bind(this), 400);  
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

        this.build();
    }
}
</script>

<style scoped>
    #paint {
        background: #fff;
        cursor: url("../assets/img/brush.png") 0 15, auto;
    }
    .eraser {
        cursor: url("../assets/img/eraser.png") 0 15, auto !important; 
    }
</style>