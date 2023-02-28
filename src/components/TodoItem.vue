<template>
  <div class="bg-gray-300 rounded-sm">
    <div class="flex items-center px-4 py-3 border-b border-gray-400 last:border-b-0">
      <div class="flex items-center justify-center mr-2">
        <button :class="{
          'text-gray-400 font-bold': !isCompleted,
          'text-green-700 font-bold': isCompleted
        }" @click="onCheckClick">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>
      </div>

      <div class="w-full">
        <input v-model="title" :id="todo.id" type="text" placeholder="Digite a sua tarefa" @keyup.enter="onTitleChange"
          class="block w-full mr-3 font-light font-bold leading-normal text-black placeholder-gray-500 bg-gray-300 appearance-none focus:outline-none">
      </div>

      <div class="flex items-center justify-center ml-auto">
        <button @click="onDelete" class="focus:outline-none">
          <svg class="w-4 h-4 ml-3 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7L18.1327 19.1425C18.0579
                                                                                  20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732
                                                                                  19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772
                                                                                  3 9 3.44772 9 4V7M4 7H20"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import toastr from 'toastr';
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  props: {
    todo: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {

    const title = ref(props.todo.title);
    const isCompleted = ref(props.todo.completed);
    const store = useStore()

    const onTitleChange = () => {
      if (!title.value) {
        return;
      }

      const params = 1
      updateTodo(params)
    }

    const onCheckClick = () => {
      isCompleted.value = !isCompleted.value

      if (isCompleted.value === false) {
        let params = 2;

        updateTodo(params)
      } else {
        let params = 3;

        updateTodo(params)
      }
    }

    const updateTodo = (params) => {

      const payload = {
        id: props.todo.id,
        data: {
          title: title.value,
          completed: isCompleted.value
        }
      }

      store.dispatch('updateTodo', payload).finally(() => {
        if (params === 1) {
          toastr.warning('Tarefa editada com sucesso!')
        } else if (params === 2) {
          toastr.error('Tarefa não realizada!')
        } else {
          toastr.success('Tarefa realizada!')
        }

      })
    }

    const onDelete = () => {
      store.dispatch('deleteTodo', props.todo.id).finally(() => {
        toastr.error('Tarefa apagada!')
      })
    }

    return {
      title,
      isCompleted,
      onDelete,
      updateTodo,
      onCheckClick,
      onTitleChange,
    }
  }
}

</script>


