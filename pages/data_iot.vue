<template>
  <div class="container">
    
    <transition name="fade">
      <div v-if="notification.show" :class="['toast-notification', notification.type]">
        {{ notification.message }}
      </div>
    </transition>

    <div style="margin-bottom: 20px;">
      <NuxtLink to="/wellcome" class="btn-back">
        &larr; Kembali ke Beranda
      </NuxtLink>
    </div>

    <!-- Header & Tombol Tambah Modal -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 15px;">
      <h1 class="title" style="margin: 0;">Dashboard IoT Device Management</h1>
      <button @click="openAddModal" class="btn-primary" style="padding: 10px 20px; font-weight: 600;">
        + Tambah Device Baru
      </button>
    </div>
    
    <!-- KOTAK STATISTIK / RINGKASAN -->
    <div class="stats-container">
      <div class="stat-card">
        <span class="stat-title">Total Perangkat</span>
        <span class="stat-value">{{ totalDevices }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Status Nyala (ON)</span>
        <span class="stat-value text-green">{{ totalOn }}</span>
      </div>
      <div class="stat-card">
        <span class="stat-title">Status Mati (OFF)</span>
        <span class="stat-value text-red">{{ totalOff }}</span>
      </div>
    </div>

    <!-- MODAL POP-UP FORM (Tambah / Edit) -->
    <transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <div class="modal-header">
            <h3>{{ isEdit ? 'Edit Device' : 'Tambah Device Baru' }}</h3>
            <button @click="closeModal" class="btn-close-modal">&times;</button>
          </div>
          
          <form @submit.prevent="saveDevice" class="form-grid" style="grid-template-columns: 1fr;">
            <div>
              <label style="display: block; margin-bottom: 6px; font-size: 0.9rem; color: #cbd5e1;">Nama Perangkat</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="misal: Sensor Suhu"
                required
                style="width: 100%;"
              />
            </div>
            <div>
              <label style="display: block; margin-bottom: 6px; font-size: 0.9rem; color: #cbd5e1;">Lokasi</label>
              <input
                v-model="form.location"
                type="text"
                placeholder="misal: Ruang Server"
                required
                style="width: 100%;"
              />
            </div>
            <div>
              <label style="display: block; margin-bottom: 6px; font-size: 0.9rem; color: #cbd5e1;">Status</label>
              <select v-model="form.status" style="width: 100%;">
                <option value="OFF">OFF</option>
                <option value="ON">ON</option>
              </select>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <button type="submit" class="btn-primary" style="flex: 1;">
                {{ isEdit ? 'Update Device' : 'Simpan Device' }}
              </button>
              <button type="button" @click="closeModal" class="btn-delete" style="background: #6c757d; flex: 1;">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Tabel Daftar Device dengan Fitur Search -->
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
        <h3 style="margin: 0;">Daftar Device Terhubung</h3>
        
        <!-- Input Search -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama perangkat / lokasi..."
          style="padding: 8px 12px; border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(15, 23, 42, 0.75); color: #ffffff; border-radius: 6px; width: 260px; font-size: 0.9rem; outline: none;"
        />
      </div>

      <table class="device-table" v-if="filteredDevices.length > 0">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Perangkat</th>
            <th>Lokasi</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(device, index) in filteredDevices" :key="device.id">
            <td>{{ index + 1 }}</td>
            <td>{{ device.name }}</td>
            <td>{{ device.location }}</td>
            <td>
              <span :class="['status-badge', device.status === 'ON' ? 'status-on' : 'status-off']">
                {{ device.status }}
              </span>
            </td>
            <td>
              <button class="btn-primary" style="padding: 5px 10px; margin-right: 5px; background: #ffc107; color: black;" @click="editDevice(device)">
                Edit
              </button>
              <button class="btn-delete" @click="deleteDevice(device.id)">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Tampilan Kosong (Empty State) -->
      <div v-if="filteredDevices.length === 0" class="empty-state">
        <div class="empty-icon">📡</div>
        <p>Belum ada perangkat IoT atau data tidak ditemukan.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      devices: [],
      searchQuery: '',
      showModal: false, // Kontrol buka/tutup pop-up
      form: {
        name: '',
        location: '',
        status: 'OFF'
      },
      isEdit: false,
      editId: null,
      notification: {
        show: false,
        message: '',
        type: 'success'
      }
    }
  },
  computed: {
    filteredDevices() {
      if (!this.searchQuery) {
        return this.devices
      }
      const query = this.searchQuery.toLowerCase()
      return this.devices.filter(device => {
        return (
          device.name.toLowerCase().includes(query) ||
          device.location.toLowerCase().includes(query)
        )
      })
    },
    totalDevices() {
      return this.devices.length
    },
    totalOn() {
      return this.devices.filter(device => device.status === 'ON').length
    },
    totalOff() {
      return this.devices.filter(device => device.status === 'OFF').length
    }
  },
  mounted() {
    this.fetchDevices()
  },
  methods: {
    showToast(message, type = 'success') {
      this.notification = { show: true, message, type }
      setTimeout(() => {
        this.notification.show = false
      }, 3000)
    },

    async fetchDevices() {
      try {
        const res = await this.$axios.$get('/api/devices')
        this.devices = res
      } catch (err) {
        console.error('Gagal mengambil data:', err)
      }
    },

    openAddModal() {
      this.resetForm()
      this.showModal = true
    },

    editDevice(device) {
      this.isEdit = true
      this.editId = device.id
      this.form = {
        name: device.name,
        location: device.location,
        status: device.status
      }
      this.showModal = true
    },

    closeModal() {
      this.showModal = false
      this.resetForm()
    },

    async saveDevice() {
      try {
        if (this.isEdit) {
          await this.$axios.$put(`/api/devices/${this.editId}`, this.form)
          this.showToast('Perangkat berhasil diperbarui!', 'success')
        } else {
          await this.$axios.$post('/api/devices', this.form)
          this.showToast('Perangkat baru berhasil ditambahkan!', 'success')
        }
        
        this.closeModal()
        this.fetchDevices()
      } catch (err) {
        console.error('Gagal menyimpan data:', err)
        this.showToast('Terjadi kesalahan saat menyimpan data.', 'error')
      }
    },

    resetForm() {
      this.form = {
        name: '',
        location: '',
        status: 'OFF'
      }
      this.isEdit = false
      this.editId = null
    },

    async deleteDevice(id) {
      if (confirm('Yakin ingin menghapus device ini?')) {
        try {
          await this.$axios.$delete(`/api/devices/${id}`)
          this.showToast('Perangkat berhasil dihapus!', 'error')
          this.fetchDevices()
        } catch (err) {
          console.error('Gagal menghapus data:', err)
          this.showToast('Gagal menghapus perangkat.', 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
@import '~/assets/css/style.css';
</style>