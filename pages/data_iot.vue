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

    <h1 class="title">Dashboard IoT Device Management</h1>
    
    <div class="card">
      <h3>{{ isEdit ? 'Edit Device' : 'Tambah Device Baru' }}</h3>
      
      <form @submit.prevent="saveDevice" class="form-grid">
        <input
          v-model="form.name"
          type="text"
          placeholder="Nama Perangkat (misal: Sensor Suhu)"
          required
        />
        <input
          v-model="form.location"
          type="text"
          placeholder="Lokasi (misal: Ruang Server)"
          required
        />
        <select v-model="form.status">
          <option value="OFF">OFF</option>
          <option value="ON">ON</option>
        </select>
        
        <button type="submit" class="btn-primary">
          {{ isEdit ? 'Update Device' : 'Simpan Device' }}
        </button>
        
        <button type="button" v-if="isEdit" @click="resetForm" class="btn-delete" style="background: #6c757d;">
          Batal
        </button>
      </form>
    </div>

    <!-- Tabel Daftar Device dengan Fitur Search -->
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; flex-wrap: wrap; gap: 10px;">
        <h3 style="margin: 0;">Daftar Device Terhubung</h3>
        
        <!-- Input Search -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari nama perangkat / lokasi..."
          style="padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; width: 260px; font-size: 0.9rem; outline: none;"
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

      <!-- Tampilan Kosong (Empty State dengan Gambar/Ikon Ilustrasi Manual) -->
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

    editDevice(device) {
      this.isEdit = true
      this.editId = device.id
      this.form = {
        name: device.name,
        location: device.location,
        status: device.status
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
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
        
        this.resetForm()
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
          // Notifikasi hapus sekarang menggunakan tipe 'error' (warna merah)
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