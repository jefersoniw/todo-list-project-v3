<template>
    <!-- Content -->
    <div class="px-3 py-10 md:px-10">
        <div class="w-full p-5 mx-auto border border-green-600 rounded-lg sm:w-1/2 lg:w-1/3">

            <!-- Todo title -->
            <TodoTitle />
            <!--/ Todo title -->

            <!-- Todo spinner -->
            <TodoSpinner v-if="loading" />
            <!--/ Todo spinner -->

            <template v-else>
                <!-- Todo form -->
                <TodoFormAdd />
                <!--/ Todo form -->

                <!-- Todo items -->
                <TodoItems v-if="$store.state.todos.length" />
                <!--/ Todo items -->

                <!-- Todo empty -->
                <TodoEmpty v-else />
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
import TodoTitle from './components/TodoTitle.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'App',
    components: { TodoSpinner, TodoFormAdd, TodoItems, TodoEmpty, TodoTitle },

    setup() {
        const loading = ref(false);
        const store = useStore()

        loading.value = true;
        store.dispatch('getTodos').finally(() => {
            loading.value = false;
        });

        return {
            loading,
        }
    },
}
</script>

