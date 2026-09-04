<template>
  <div class="login-container">
    <!-- KOLOM KIRI: Area Gambar & Identitas Sekolah / Branding -->
    <div class="login-left-pane">
      <div class="login-header-top">
        <span class="badge-portal">IoT Smart Lab Portal</span>
        <div class="status-indicator">
          <span class="text-xs text-slate-300">ID</span>
          <div class="pulse-dot"></div>
        </div>
      </div>

      <div class="login-hero-text">
        <h1 class="hero-title">
          Monitoring & <br>Control System.
        </h1>
        <p class="hero-desc">
          Platform manajemen perangkat IoT berbasis web untuk efisiensi dan kemudahan pengawasan laboratorium sekolah.
        </p>
      </div>

      <div class="school-profile-card">
        <div class="school-logo-box">SK</div>
        <div>
          <p class="text-sm font-bold text-white">SMK PPLG Hebat</p>
          <p class="text-xs text-slate-300">Software & Game Development</p>
        </div>
      </div>
    </div>

    <!-- KOLOM KANAN: Form Login Modern -->
    <div class="login-right-pane">
      <div class="login-card-box">
        <div class="card-title-area">
          <h2>Welcome Back!</h2>
          <p>Silakan masuk menggunakan akun terdaftar.</p>
        </div>

        <form class="form-group-container" @submit.prevent="handleLogin">
          <div class="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              v-model="email"
              required 
              placeholder="nama@sekolah.sch.id"
              class="input-field"
            >
          </div>

          <div class="input-group">
            <div class="label-row">
              <label>Password</label>
              <a :href="waForgotLink" target="_blank" class="forgot-link">
                Lupa password?
              </a>
            </div>
            <input 
              type="password" 
              v-model="password"
              required 
              placeholder="••••••••"
              class="input-field"
            >
          </div>

          <button type="submit" class="btn-primary">
            Sign In to Dashboard
          </button>
        </form>

        <!-- Garis Pemisah dengan Tulisan "or" di Tengah -->
        <div class="divider-or">
          <span>or</span>
        </div>

        <!-- Hubungi Admin via WhatsApp -->
        <div class="footer-register">
          <p>
            Belum punya akun? 
            <a :href="waRegisterLink" target="_blank" class="wa-link">
              Hubungi Admin via WhatsApp
            </a>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      email: '',
      password: '',
      adminPhone: '62895640431365'
    }
  },
  computed: {
    waForgotLink() {
      const message = encodeURIComponent("Halo Admin, saya ingin meminta bantuan untuk reset password akun IoT Lab saya.");
      return `https://wa.me/${this.adminPhone}?text=${message}`;
    },
    waRegisterLink() {
      const message = encodeURIComponent("Halo Admin, saya ingin mendaftarkan akun baru untuk akses portal IoT Lab.");
      return `https://wa.me/${this.adminPhone}?text=${message}`;
    }
  },
  methods: {
    async handleLogin() {
      try {
        // Melakukan request POST ke backend Slim PHP endpoint /api/login
        const res = await this.$axios.$post('/api/login', {
          email: this.email,
          password: this.password
        });
        
        console.log('Login sukses:', res.message);
        // Jika berhasil (email & password cocok di database), pindah ke halaman welcome
        this.$router.push('/wellcome');
      } catch (err) {
        console.error('Login gagal:', err);
        alert('Login gagal! Periksa kembali email dan password kamu.');
      }
    }
  }
}
</script>

<style src="~/assets/css/index.css" scoped></style>