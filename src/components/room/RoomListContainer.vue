<template>
  <div class="room-list-container">
    <RoomCard
      v-for="roomItem in rooms"
      :key="roomItem.roomId"
      :title="roomItem.title"
      :memberCount="roomItem?.members.length + 1"
      class="room-list__item"
      @click="roomCardClick(roomItem)"
    />
  </div>
</template>

<script lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import RoomCard from './RoomCard.vue';
import type ServiceManager from '@/service/ServiceManager';
import type RoomService from '@/service/RoomService';

export default {
  components: {
    RoomCard
  },
  props: {
    isArchive: { type: Boolean, default: false },
    tag: { type: String, default: '' }
  },
  setup(props) {
    const router = useRouter();
    const services: ServiceManager = inject('$service')!;
    const roomService: RoomService = services.roomService;
    const isArchive = props.isArchive;

    const rooms = ref<Room[]>([]);

    const getRooms = async () => {
      const result = await roomService.getRoomList({ isArchive });
      rooms.value = result || [];
    };

    const roomCardClick = (room: Room) => {
      const roomId = room.roomId;
      router.push({ name: 'Room', params: { roomId } });
    };

    onMounted(async () => {
      await getRooms();
    });

    return { rooms, roomCardClick };
  }
};
</script>
<style lang="scss">
.room-list-container {
  display: flex;
  min-height: 100px;
  align-items: center;
  flex-wrap: wrap;

  .room-list {
    display: flex;
    gap: 12px;
  }
}
</style>
