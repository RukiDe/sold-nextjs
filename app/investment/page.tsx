// app/investor/page.tsx
import Link from "next/link";
import Script from "next/script";

const brevoInvestorFormHtml = `
<style>
  /* --- ALIGNMENT + SOLD STYLING (same pattern as refinance/purchase) --- */
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

/* Brevo wraps each field in <div style="padding: 8px 0"> — flatten it */
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
#sib-container input::placeholder,
#sib-container textarea::placeholder {
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

/* Label + input spacing */
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
    <div id="error-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; font-family:Helvetica, sans-serif; color:#661d1d; background-color:#ffeded; border-radius:3px; border-color:#ff4949;max-width:540px;">
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

    <div id="success-message" class="sib-form-message-panel" style="font-size:16px; text-align:left; font-family:Helvetica, sans-serif; color:#085229; background-color:#e7faf0; border-radius:3px; border-color:#13ce66;max-width:540px;">
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

    <div id="sib-container" class="sib-container--large sib-container--vertical" style="text-align:center; background-color:rgba(255,255,255,1); max-width:540px; border-radius:18px; border-width:1px; border-color:#ffffff; border-style:dashed; direction:ltr">
      <form id="sib-form" method="POST" action="https://13b359ae.sibforms.com/serve/MUIFAFpiGdyabj47pFhYjXO2R4_NGTNN8YYp0hYELynlJ5u_0KSfrwKdLjzfjvtapIPHijJAXVlB8cFxo28OEI8dWyIrOVIyOpA81MHLn_V1uxiTN4SY-x5u6nOVZGKn6c5-muQE1nuO0s9TOeMxSH57VyWvmHrs8uEIX2z6IYV5sTj5OMCj1KjeGRSPZYZhK6-ogIybAnc3ntI23w==" data-type="subscription">
        <!-- Name -->
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

        <!-- Email -->
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

        <!-- Category of investment loan -->
        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight:700; text-align:left; font-size:16px; font-family:Helvetica, sans-serif; color:#3c4858;" data-required="*">
                  What category of investment loan are you after?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="INVESTORPLAN[]" data-value="Refinancing" value="Refinancing" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">Refinancing</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="INVESTORPLAN[]" data-value="New loan" value="New loan" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">New loan</span>
                    </label>
                  </div>
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Loan size -->
        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight:700; text-align:left; font-size:16px; font-family:Helvetica, sans-serif; color:#3c4858;" data-required="*">
                  What size loan are you looking for?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANRANGE[]" data-value="&lt;$500k" value="&lt;$500k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">&lt;$500k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANRANGE[]" data-value="$500k-$750k" value="$500k-$750k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">$500k-$750k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANRANGE[]" data-value="$750k-$1.25m" value="$750k-$1.25m" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">$750k-$1.25m</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANRANGE[]" data-value="+$1.25m" value="+$1.25m" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">+$1.25m</span>
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
                <label class="entry__label" style="font-weight:700; text-align:left; font-size:16px; font-family:Helvetica, sans-serif; color:#3c4858;" data-required="*">
                  What type of loan are you after?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANTYPE[]" data-value="Fixed" value="Fixed" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">Fixed</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANTYPE[]" data-value="Variable" value="Variable" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">Variable</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="LOANTYPE[]" data-value="Split" value="Split" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">Split</span>
                    </label>
                  </div>
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Ownership structure -->
        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row ">
                <label class="entry__label" style="font-weight:700; text-align:left; font-size:16px; font-family:Helvetica, sans-serif; color:#3c4858;" data-required="*">
                  What ownership structure will the loan be held in?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="OWNERSHIPSTRUCTURE[]" data-value="Personal" value="Personal" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">Personal</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="OWNERSHIPSTRUCTURE[]" data-value="Joint" value="Joint" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">Joint</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="OWNERSHIPSTRUCTURE[]" data-value="Trust" value="Trust" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">Trust</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="OWNERSHIPSTRUCTURE[]" data-value="Company" value="Company" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span style="font-size:16px; font-family:Helvetica, sans-serif; color:#3C4858;">Company</span>
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
          <div class="sib-form-block" style="text-align: left">
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

export default function InvestorPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Brevo config scripts – same pattern as refinance/purchase */}
      <Script id="brevo-config-investor" strategy="lazyOnload">
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
        id="brevo-main-investor"
        src="https://sibforms.com/forms/end-form/build/main.js"
        strategy="lazyOnload"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            Investment property loans
          </h1>
          <p className="mt-5 sm:mt-6 text-base sm:text-lg text-neutral-700">
            A quick way to tell us what you&apos;re planning, how big the loan is, and how you want
            to structure it. We&apos;ll use this with your numbers to come back with options that
            fit your investment strategy.
          </p>

          <h2 className="mt-10 text-lg sm:text-xl font-semibold">
            First, tell us about your investment plans
          </h2>
          <p className="text-sm text-neutral-700 mb-4">
            A few simple questions – no credit checks. Just enough to understand what you&apos;re
            trying to do so we can shape the right path.
          </p>
        </div>

        {/* Brevo form */}
        <div
          className="mt-4 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: brevoInvestorFormHtml }}
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
