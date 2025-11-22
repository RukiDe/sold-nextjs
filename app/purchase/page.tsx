// app/purchase/page.tsx
import Link from "next/link";
import Script from "next/script";

const brevoPurchaseFormHtml = `
<style>
  /* --- ALIGNMENT + SOLD STYLING (same as refinance) --- */
.sib-form,
.sib-form-container,
#sib-container,
.sib-container--large,
.sib-input,
.sib-form-block,
.form__entry,
.entry__field {
  margin: 0 !important;
  padding: 0 !important;
  text-align: left !important;
  max-width: 100% !important;
}

/* Brevo wraps each field in <div style="padding: 8px 0"> — kill it */
#sib-form > div[style] {
  padding: 0 !important;
}

/* Remove default blocky container look */
.sib-input,
.sib-form-block,
.entry__field {
  border: none !important;
  background: transparent !important;
  box-shadow: none !important;
}

/* Pill inputs */
#sib-container .input {
  border-radius: 999px !important;
  border: 1px solid #e2e8f0 !important;
  background: #ffffff !important;
  padding: 14px 20px !important;
  font-size: 15px !important;
  width: 100% !important;
  box-sizing: border-box !important;
}

/* Placeholder text */
#sib-container input::placeholder {
  color: #94a3b8 !important;
}

/* Checkbox spacing */
.checkbox__label span:last-child {
  padding-left: 8px !important;
}

/* Button */
#sib-container .sib-form-block__button {
  border-radius: 999px !important;
  padding: 14px 24px !important;
  font-weight: 600 !important;
  font-size: 15px !important;
  background-color: #111827 !important;
  border: 1px solid #111827 !important;
  color: #ffffff !important;
}

#sib-container .sib-form-block__button:hover {
  background-color: #ffffff !important;
  color: #111827 !important;
}

/* Spacing for labels + inputs */
#sib-container .entry__label {
  margin-top: 12px !important;
  display: block !important;
}

#sib-container .input {
  margin-top: 8px !important;
  margin-bottom: 8px !important;
}

#sib-container .entry_mcq {
  margin-top: 8px !important;
  margin-bottom: 8px !important;
}

#sib-container .sib-checkbox-group {
  margin-bottom: 18px !important;
}

#sib-container,
#sib-container * {
  line-height: 1.2 !important;
}
</style>

<link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css">

<!-- Begin Brevo Form -->
<div class="sib-form" style="text-align: center; background-color: transparent;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="error-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; color:#661d1d; background-color:#ffeded; border-radius:3px; border-color:#ff4949;max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
        </svg>
        <span class="sib-form-message-panel__inner-text">
          Something didn&#039;t work. Please give it another shot. 
        </span>
      </div>
    </div>

    <div></div>

    <div id="success-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; color:#085229; background-color:#e7faf0; border-radius:3px; border-color:#13ce66;max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <svg viewBox="0 0 512 512" class="sib-icon sib-notification__icon">
          <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
        </svg>
        <span class="sib-form-message-panel__inner-text">
          You&#039;ll receive an email from us shortly (check your spam folder). 
        </span>
      </div>
    </div>

    <div></div>

    <div id="sib-container" class="sib-container--large sib-container--vertical" style="background-color:rgba(255,255,255,1); max-width:540px; border-radius:25px; border-width:1px; border-color:#ffffff; border-style:dashed; direction:ltr;">
      <form id="sib-form" method="POST" action="https://13b359ae.sibforms.com/serve/MUIFAFv1x8v7IYoAfW1CpoVQeNNHc-jzQtVALEFKOO3JZenOOpYHjlaY4HQ9aiEXXNf0h-7vxtTRLv7E2MuvJ6sCGmaxa1kLtNhggz2OqkD0MuaDqg1LP5d5zbAjCt75dJBYx7lBxdF9j8Mvsoky3MlIwVKPWbtksneuHd56avMoILB0dsRtQKdgCRqCqysGpVZG6sFTbZYHFJoMWw==" data-type="subscription">
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <div class="entry__field">
                  <input class="input " maxlength="200" type="text" id="FIRSTNAME" name="FIRSTNAME" autocomplete="off" placeholder="Preferred name" data-required="true" required />
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row ">
                <div class="entry__field">
                  <input class="input " type="text" id="EMAIL" name="EMAIL" autocomplete="off" placeholder="Email" data-required="true" required />
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Reason for moving -->
        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight:700; text-align:left; font-size:16px; color:#3c4858;" data-required="*">
                  What’s driving the move?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="REASONFORMOVING[]" data-value="More space" value="More space" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">More space</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="REASONFORMOVING[]" data-value="Lifestyle" value="Lifestyle" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">Lifestyle</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="REASONFORMOVING[]" data-value="School zone" value="School zone" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">School zone</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="REASONFORMOVING[]" data-value="Work" value="Work" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">Work</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="REASONFORMOVING[]" data-value="Investment" value="Investment" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">Investment</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="REASONFORMOVING[]" data-value="Downsize" value="Downsize" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">Downsize</span>
                    </label>
                  </div>
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Loan type -->
        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight:700; text-align:left; font-size:16px; color:#3c4858;" data-required="*">
                  What type of loan are you after?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANTYPE[]" data-value="Fixed" value="Fixed" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">Fixed</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANTYPE[]" data-value="Variable" value="Variable" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">Variable</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANTYPE[]" data-value="Split" value="Split" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">Split</span>
                    </label>
                  </div>
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Timeframe -->
        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight:700; text-align:left; font-size:16px; color:#3c4858;" data-required="*">
                  When do you need the loan?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="BUYINGTIMEFRAME[]" data-value="ASAP" value="ASAP" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">ASAP</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="BUYINGTIMEFRAME[]" data-value="1–3 months" value="1–3 months" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">1–3 months</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="BUYINGTIMEFRAME[]" data-value="3–6 months" value="3–6 months" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">3–6 months</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="BUYINGTIMEFRAME[]" data-value="+6 months" value="+6 months" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; color:#3C4858;">+6 months</span>
                    </label>
                  </div>
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Submit -->
        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="text-align:left;">
            <button class="sib-form-block__button sib-form-block__button-with-loader" form="sib-form" type="submit">
              <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512">
                <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
              </svg>
              I&#039;m ready for the next steps
            </button>
          </div>
        </div>

        <input type="text" name="email_address_check" value="" class="input--hidden">
        <input type="hidden" name="locale" value="en">
      </form>
    </div>
  </div>
</div>
<!-- End Brevo Form -->
`;

export default function PurchasePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Brevo config scripts – same as refinance */}
      <Script id="brevo-config-purchase" strategy="lazyOnload">
        {`
          window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
          window.LOCALE = 'en';
          window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
          window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";
          window.GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
          window.translation = {
            common: {
              selectedList: '{quantity} list selected',
              selectedLists: '{quantity} lists selected',
              selectedOption: '{quantity} selected',
              selectedOptions: '{quantity} selected',
            }
          };
          var AUTOHIDE = Boolean(0);
        `}
      </Script>
      <Script
        id="brevo-main-purchase"
        src="https://sibforms.com/forms/end-form/build/main.js"
        strategy="lazyOnload"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            Buying your next place
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-700">
            A quick way to tell us what you&apos;re looking to buy, why you&apos;re moving and how
            soon you need finance lined up. We&apos;ll use this along with your numbers to come
            back with options.
          </p>

          <h2 className="mt-10 text-lg sm:text-xl font-semibold">
            First, tell us about your plans
          </h2>
          <p className="text-sm text-neutral-700 mb-4">
            A few simple questions – no credit checks, just enough to understand your direction and
            timing so we can shape the right path.
          </p>
        </div>

        {/* Brevo form */}
        <div
          className="mt-4 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: brevoPurchaseFormHtml }}
          suppressHydrationWarning
        />

        <div className="mt-8">
          <Link href="/" className="btn btn-ghost">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
