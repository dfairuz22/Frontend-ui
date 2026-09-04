<template>
  <div class="login-container">
    <!-- KOLOM KIRI -->
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
          <p class="text-xs text-slate-200">Software & Game Development</p>
        </div>
      </div>
    </div>

    <!-- KOLOM KANAN -->
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
            
            <!-- Input Password dengan Ikon Mata SVG Standar Web -->
            <div style="position: relative; display: flex; align-items: center;">
              <input 
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                required 
                placeholder="••••••••"
                class="input-field"
                style="padding-right: 42px;"
              >
              <span 
                @click="showPassword = !showPassword" 
                style="position: absolute; right: 12px; cursor: pointer; display: flex; align-items: center; color: #94a3b8;"
                title="Tampilkan/Sembunyikan Password"
              >
                <!-- Ikon Mata Terbuka (Show) -->
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <!-- Ikon Mata Tertutup / Dicoret (Hide) -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </span>
            </div>
          </div>

          <button type="submit" class="btn-primary">
            Sign In to Dashboard
          </button>
        </form>

        <!-- Garis Pemisah dengan Tulisan "or" di Tengah -->
        <div class="divider-or">
          <span>or</span>
        </div>

        <!-- Tautan Register & Kendala WhatsApp -->
        <div class="footer-register">
          <p>
            Belum punya akun? 
            <NuxtLink to="/register" class="wa-link">
              Daftar di sini
            </NuxtLink>
          </p>
          <p style="margin-top: 8px;">
            <a :href="waHelpLink" target="_blank" class="wa-link">
             ⚠️ Ada kendala hubungi saja WA Admin click disini 
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
      showPassword: false,
      adminPhone: '62895640431365'
    }
  },
  computed: {
    waForgotLink() {
      const message = encodeURIComponent("Halo Admin, saya ingin meminta bantuan untuk reset password akun IoT Lab saya.");
      return `https://wa.me/${this.adminPhone}?text=${message}`;
    },
    waHelpLink() {
      const message = encodeURIComponent("Halo Admin, saya ada kendala terkait portal IoT Lab.");
      return `https://wa.me/${this.adminPhone}?text=${message}`;
    }
  },
  methods: {
    async handleLogin() {
      try {
        const res = await this.$axios.$post('/api/login', {
          email: this.email,
          password: this.password
        });
        
        console.log('Login sukses:', res.message);
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