<template>
    <component :is="componentName" :type="type"></component>
</template>

<script>
export default {
    name: 'Widget',
    components: {
        'ChartWidget': () => import('@/views/Dashboard/widget/ChartWidget'),
        'TableWidget': () => import('@/views/Dashboard/widget/TableWidget'),
    },
    props: {
        widgetId: {
            type: String,
            default: 'TableWidget',
        },
        type: {
            type: String,
            default: '',
        },
    },
    computed: {
        componentName() {
            if (this.widgetId === 'chart') {
                return 'ChartWidget';
            }
            return 'TableWidget';
        },
    },
    data() {
        return {
        }
    }
}
</script>