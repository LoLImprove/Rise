Rise.Schemas = Rise.Schemas || {}
Rise.Schemas.Forms = Rise.Schemas.Forms || {}

Rise.Schemas.Forms.Register = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    unique: true
  },

  level_of_play: { type: String },
  IGN: { type: String, optional: true },

  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: {
    type: String,
    label: "Password",
    min: 6,
    autoform: {
      afFieldInput: {
        type: "password"
      }
    }
  },
  passwordConfirmation: {
    type: String,
    label: "Password confirmation",
    min: 6,
    autoform: {
      afFieldInput: {
        type: "password"
      }
    },
    custom: function () {
      if (this.value !== this.field('password').value) {
        return "passwordMismatch";
      }
    }
  },
});
