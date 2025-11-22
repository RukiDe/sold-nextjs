import Link from "next/link";
import Script from "next/script";

const brevoFhbFormHtml = `
<style>
  /* --- ALIGNMENT + SOLD STYLING (same pattern as investor) --- */
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

<!-- Begin Brevo Form (First Home Buyer) -->
<div class="sib-form" style="text-align: center; background-color: transparent;">
  <div id="sib-form-container" class="sib-form-container">

    <div id="sib-container" class="sib-container--large sib-container--vertical" style="background-color:rgba(255,255,255,1); max-width:540px; border-radius:18px; border-width:1px; border-color:#ffffff; border-style:dashed; direction:ltr">
      <form
        id="sib-form"
        method="POST"
        action="https://13b359ae.sibforms.com/serve/MUIFAP-d0Nk2UbQ-sB-p-3mau7R-YM7aYsThPvSzfXQSbMaktPHcT9Gh3q7ksY_b-ZZvJMwR2zBnANTNFh9L6TLbDAvm3sFNmrbQT-EZpNCePWIpKw2Ud2MaAVi638_fLHZxii1xND4OQdljOhUAeOXPDIUmrIiAoDrH0KMnpiO98OmvTmGTZUiQ44kzgJLN-SeXw5Tozdx0jeEiCw=="
        data-type="subscription"
      >

        <!-- Preferred name -->
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row">
                <div class="entry__field">
                  <input
                    class="input"
                    type="text"
                    name="FIRSTNAME"
                    id="FIRSTNAME"
                    autocomplete="off"
                    placeholder="Preferred name"
                    data-required="true"
                    required
                  />
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
              <div class="form__label-row">
                <div class="entry__field">
                  <input
                    class="input"
                    type="text"
                    name="EMAIL"
                    id="EMAIL"
                    autocomplete="off"
                    placeholder="Email"
                    data-required="true"
                    required
                  />
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Deposit saved -->
        <div style="padding: 8px 0;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row">
                <label
                  class="entry__label"
                  style="font-weight:700; font-size:16px; color:#3c4858;"
                  data-required="*"
                >
                  How much have you saved for your deposit ($s)?
                </label>
                <div class="entry__field">
                  <input
                    class="input"
                    type="text"
                    name="DEPOSITSAVED"
                    id="DEPOSITSAVED"
                    autocomplete="off"
                    placeholder="50,000"
                    data-required="true"
                    required
                  />
                </div>
              </div>
              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Gross income (CHECKBOXES FIXED) -->
        <div style="padding: 8px 0;">
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row">
                <label
                  class="entry__label"
                  style="font-weight:700; font-size:16px; color:#3c4858;"
                  data-required="*"
                >
                  What’s your gross (pre-tax) annual income?
                </label>

                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input
                        type="checkbox"
                        class="input_replaced"
                        name="COMBINEDANNUALINCOME[]"
                        value="<80k"
                        data-required="true"
                      />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>&lt;$80k</span>
                    </label>
                  </div>

                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input
                        type="checkbox"
                        class="input_replaced"
                        name="COMBINEDANNUALINCOME[]"
                        value="$80k–$120k"
                        data-required="true"
                      />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$80k–$120k</span>
                    </label>
                  </div>

                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input
                        type="checkbox"
                        class="input_replaced"
                        name="COMBINEDANNUALINCOME[]"
                        value="$120k-$180k"
                        data-required="true"
                      />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$120k–$180k</span>
                    </label>
                  </div>

                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input
                        type="checkbox"
                        class="input_replaced"
                        name="COMBINEDANNUALINCOME[]"
                        value="$180k-$250k"
                        data-required="true"
                      />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$180k–$250k</span>
                    </label>
                  </div>

                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input
                        type="checkbox"
                        class="input_replaced"
                        name="COMBINEDANNUALINCOME[]"
                        value="$250k+"
                        data-required="true"
                      />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>+$250k</span>
                    </label>
                  </div>
                </div>
              </div>

              <p style="font-size:12px;color:#6b7280;margin-top:4px;">
                If two of you are applying, add incomes together.
              </p>

              <label class="entry__error entry__error--primary"></label>
            </div>
          </div>
        </div>

        <!-- Submit -->
        <div style="padding: 8px 0;">
          <div class="sib-form-block" style="text-align:left;">
            <button class="sib-form-block__button sib-form-block__button-with-loader" type="submit">
              I&#039;m ready for the next steps
            </button>
          </div>
        </div>

        <input type="hidden" name="locale" value="en" />
      </form>
    </div>
  </div>
</div>
<!-- End Brevo Form -->
`;

export default function FirstHomeBuyerPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Brevo config scripts */}
      <Script id="brevo-config-fhb" strategy="lazyOnload">
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
        id="brevo-main-fhb"
        src="https://sibforms.com/forms/end-form/build/main.js"
        strategy="lazyOnload"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black">First Home Buyer</h1>
          <p className="mt-4 text-lg text-neutral-700">
            We help you understand your borrowing power, grants eligibility and
            lender appetite — without a credit check.
          </p>

          <ul className="mt-6 list-disc list-inside text-neutral-700 space-y-2">
            <li>Estimate borrowing based on income and savings.</li>
            <li>Check FHOG and shared-equity program eligibility.</li>
            <li>See which lenders are first-home friendly right now.</li>
          </ul>

          <h2 className="mt-10 text-xl font-semibold">First, tell us a bit about your plans</h2>
          <p className="text-sm text-neutral-600 mb-6">
            Answer a few quick questions — no credit check required.
          </p>
        </div>

        <div
          className="mt-4 max-w-3xl"
          dangerouslySetInnerHTML={{ __html: brevoFhbFormHtml }}
          suppressHydrationWarning
        />

        <div className="mt-10">
          <Link href="/" className="btn btn-ghost">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
