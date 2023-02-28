<template>
    <div>
        <form @submit.prevent="addTodo"
            class="flex items-center px-4 mb-3 bg-gray-900 border-l-2 border-green-400 rounded-sm h-15">
            <input v-model="title" placeholder="Adicione um novo item ..." type="text"
                class="block w-full py-3 pr-3 font-light leading-normal text-gray-500 placeholder-gray-500 bg-gray-900 appearance-none focus:outline-none">

            <button class="text-xs font-semibold text-green-400 focus:outline-none" type="submit">
                ADICIONAR
            </button>
        </form>
    </div>
</template>

<script>
import toastr from 'toastr'
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'TodoListProjectTodoFormAdd',

    setup() {
        const title = ref('');
        const store = useStore;

        const addTodo = () => {

            if (title.value == '') {
                return false;
            }

            store.dispatch('addTodo', {
                title: title.value,
                completed: false
            }).finally(() => {
                title.value = ''
                toastr.success('Tarefa cadastrada!')
            })
        }

        return {
            title,
            addTodo
        }
    },
};
</script>