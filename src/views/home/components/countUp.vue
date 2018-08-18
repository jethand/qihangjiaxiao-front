<template>
    <div>
        <p :class="className" :style="{textAlign: 'center', color: color, fontSize: countSize, fontWeight: countWeight}"><span v-cloak :id="idName">{{ startVal }}</span><span style="font-size:12px">{{ unit }}</span></p>
        <slot name="intro"></slot>
    </div>
</template>

<script>
import CountUp from 'countup';

function transformValue (val) {
    return {
        val
    }
}

export default {
    data () {
        return {
            demo: {}
        };
    },
    name: 'countUp',
    props: {
        unit: String,
        idName: String,
        className: String,
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Number,
            required: true
        },
        decimals: {
            type: Number,
            default: 1
        },
        duration: {
            type: Number,
            default: 2
        },
        delay: {
            type: Number,
            default: 500
        },
        options: {
            type: Object,
            default: () => {
                return {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.'
                };
            }
        },
        color: String,
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        introText: [String, Number]
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                let res = transformValue.bind(this)(this.endVal);
                let endVal = res.val;
                let demo = {};
                let decimals = this.unit === '人' ? 0 : 1;
                this.demo = demo = new CountUp(this.idName, this.startVal, endVal, decimals, this.duration, this.options);
                if (!demo.error) {
                    demo.start();
                }
            }, this.delay);
        });
    },
    watch: {
        endVal (val) {
            let res = transformValue.bind(this)(val);
            let endVal = res.val;
            this.demo.update(endVal);
        }
    }
};
</script>
