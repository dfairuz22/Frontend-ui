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
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">Welcome Back!</h2>
          <p class="text-sm text-slate-500 mt-2">Silakan masuk menggunakan akun terdaftar.</p>
        </div>

        <form class="space-y-5" @submit.prevent="handleLogin">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Email Address</label>
            <input 
              type="email" 
              v-model="email"
              required 
              placeholder="nama@sekolah.sch.id"
              class="input-field"
            >
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
              <a href="#" class="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Lupa password?</a>
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

        <div class="relative flex py-2 items-center">
          <div class="flex-grow border-t border-slate-200"></div>
          <span class="flex-shrink mx-4 text-xs text-slate-400 uppercase tracking-widest">or</span>
          <div class="flex-grow border-t border-slate-200"></div>
        </div>

        <button type="button" class="btn-google">
          <span>Continue with Google</span>
        </button>

        <p class="text-center text-xs text-slate-500 pt-2">
          Belum punya akun? <a href="#" class="font-bold text-indigo-600 hover:underline">Hubungi Admin Lab</a>
        </p>
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
      password: ''
    }
  },
  methods: {
    handleLogin() {
      console.log('Login dengan:', this.email);
      alert('Fitur login berhasil dipicu! Siap dihubungkan ke backend API.');
    }
  }
}
</script>

<style src="~/assets/css/login.css" scoped></style>