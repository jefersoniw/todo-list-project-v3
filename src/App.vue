<template>
    <!-- Content -->
    <div class="px-3 py-10 md:px-10">
        <div class="w-full sm:w-1/2 lg:w-1/3 mx-auto">

            <pre>
                 <!-- {{ $store.state.todos }}  -->
            </pre>
            <!-- Todo spinner -->
            <TodoSpinner v-if="loading" />
            <!--/ Todo spinner -->

            <template v-else>
                <!-- Todo form -->
                <TodoFormAdd />
                <!--/ Todo form -->

                <!-- Todo items -->
                <TodoItems />
                <!--/ Todo items -->

                <!-- Todo empty -->
                <TodoEmpty />
                <!--/ Todo empty -->
            </template>


        </div>
    </div>
    <!--/ Content -->
</template>

<script>
import TodoFormAdd from './components/TodoFormAdd.vue'
import TodoSpinner from './components/TodoSpinner.vue'
import TodoItems from './components/TodoItems.vue'
import TodoEmpty from './components/TodoEmpty.vue'

export default {
    components: { TodoSpinner, TodoFormAdd, TodoItems, TodoEmpty },
    name: 'App',

    data() {
        return {
            loading: false
        }
    },

    created() {
        this.loading = true;
        this.$store.dispatch('getTodos').finally(() => {
            this.loading = false;
        });
    },

}
</script>

