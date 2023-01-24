<template>
  <div class="room-list-container">
    <RoomCard
      v-for="roomItem in rooms"
      :key="roomItem.roomId"
      :title="roomItem.title"
      :memberCount="roomItem?.members.length + 1"
      class="room-list__item"
    />
  </div>
</template>

<script lang="ts">
import RoomCard from './RoomCard.vue';
import { inject, onMounted, ref } from 'vue';
import type ServiceManager from '@/service/ServiceManager';
import type RoomService from '@/service/RoomService';

export default {
  components: {
    RoomCard
  },
  props: {
    tag: { type: String, default: '' }
  },
  setup() {
    const services: ServiceManager = inject('$service')!;
    const roomService: RoomService = services.roomService;

    const rooms = ref<Room[]>([]);

    const getRooms = async () => {
      const result = await roomService.getRoomList();
      rooms.value = result;
    };

    onMounted(async () => {
      await getRooms();
    });

    return { rooms };
  }
};
</script>
<style lang="scss">
.room-list-container {
  display: flex;
  min-height: 100px;
  align-items: center;

  .room-list {
    display: flex;
    gap: 12px;
  }
}
</style>
