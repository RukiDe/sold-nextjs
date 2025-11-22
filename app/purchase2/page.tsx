// app/purchase2/page.tsx
export default function PurchaseMoreDetailsPage() {
  const html = `
  <div style="text-align: left;">
    <style>
      /* --- GLOBAL ALIGNMENT + CONTAINER RESET --- */
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

      #sib-container {
        border: none !important;
        background: transparent !important;
        box-shadow: none !important;
        padding: 0 !important;
      }

      /* Flatten Brevo's inline padding wrappers */
      #sib-form > div[style] {
        padding: 0 !important;
      }

      /* Remove blocky backgrounds */
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

      /* Placeholder */
      #sib-container input::placeholder,
      #sib-container textarea::placeholder {
        color: #94a3b8 !important;
      }

      /* Labels */
      #sib-container .entry__label {
        margin-top: 16px !important;
        margin-bottom: 4px !important;
        display: block !important;
        font-weight: 700 !important;
        color: #111827 !important;
      }

      /* Red required asterisk – match other pages */
      #sib-container .entry__label[data-required]::after {
        content: " *";
        color: #ef4444 !important;
      }

      /* Errors + helper text */
      #sib-container .entry__error {
        margin-top: 4px !important;
      }

      #sib-container .entry__specification {
        margin-top: 6px !important;
        margin-bottom: 0 !important;
      }

      /* Checkbox layout */
      .checkbox__label {
        display: flex !important;
        align-items: flex-start !important;
      }

      .checkbox__label input {
        margin-top: 4px !important;
      }

      .checkbox__label span:last-child {
        padding-left: 22px !important;
      }

      #sib-container .sib-checkbox-group {
        margin-top: 8px !important;
        margin-bottom: 8px !important;
      }

      /* Button styling – match home pills */
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

      /* Hide Brevo error/success banners (big icons) */
      #error-message,
      #success-message {
        display: none !important;
        max-height: 0 !important;
        padding: 0 !important;
        margin: 0 !important;
        border: none !important;
      }

      #sib-container,
      #sib-container * {
        line-height: 1.2 !important;
      }
    </style>

    <div class="sib-form" style="background-color: transparent;">
      <div id="sib-form-container" class="sib-form-container">
        <div id="error-message"></div>
        <div id="success-message"></div>

        <div
          id="sib-container"
          class="sib-container--large sib-container--vertical"
        >
          <form
            id="sib-form"
            method="POST"
            action="https://13b359ae.sibforms.com/serve/MUIFAMMjiWlcWG--c463C33a-9VHk18SMvm_faVF3gGA4JSbuojBKf2tUXsepxZZhzXQdI1rMJ_cKqZ6AiQ0fl9bfHT7mPylm3uAFgX_EBfnkerGruP2gXgn3W5o4SyJbE7wywHXKQ7TNrUfTCJs1BLq3wPXaqGjvZe1Xc4Uwue4aIKVBcH-0ORMUnA4cmwsbdDgyf_NP3nQuOCP_Q=="
            data-type="subscription"
          >

            <!-- Current balances -->
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row">
                  <label
                    class="entry__label"
                    for="TOTALLOANSOUTSTANDING"
                  >
                    What are your current home loan balances (if any)?
                  </label>
                  <div class="entry__field">
                    <input
                      maxlength="200"
                      type="text"
                      data-numeric="true"
                      class="input"
                      id="TOTALLOANSOUTSTANDING"
                      name="TOTALLOANSOUTSTANDING"
                      autocomplete="off"
                    />
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
              </div>
            </div>

            <!-- Property valuation -->
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row">
                  <label
                    class="entry__label"
                    data-required="*"
                    for="PROPERTYVALUE"
                  >
                    Roughly what is the property valuation you're looking at?
                  </label>
                  <div class="entry__field">
                    <input
                      maxlength="200"
                      type="text"
                      data-numeric="true"
                      class="input"
                      id="PROPERTYVALUE"
                      name="PROPERTYVALUE"
                      autocomplete="off"
                      data-required="true"
                      required
                    />
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
              </div>
            </div>

            <!-- Deposit saved -->
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row">
                  <label
                    class="entry__label"
                    data-required="*"
                    for="DEPOSITSAVED"
                  >
                    How much do you have saved for a deposit?
                  </label>
                  <div class="entry__field">
                    <input
                      maxlength="200"
                      type="text"
                      data-numeric="true"
                      class="input"
                      id="DEPOSITSAVED"
                      name="DEPOSITSAVED"
                      autocomplete="off"
                      data-required="true"
                      required
                    />
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
              </div>
            </div>

            <!-- Loan type -->
            <div class="sib-checkbox-group sib-form-block" data-required="true">
              <div class="form__entry entry_mcq">
                <div class="form__label-row">
                  <label class="entry__label" data-required="*">
                    What type of loan are you after?
                  </label>
                  <div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="LOANTYPE[]"
                          data-value="Fixed"
                          value="Fixed"
                          data-required="true"
                        />
                        <span></span>
                        <span>Fixed</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="LOANTYPE[]"
                          data-value="Variable"
                          value="Variable"
                          data-required="true"
                        />
                        <span></span>
                        <span>Variable</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="LOANTYPE[]"
                          data-value="Split"
                          value="Split"
                          data-required="true"
                        />
                        <span></span>
                        <span>Split</span>
                      </label>
                    </div>
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
              </div>
            </div>

            <!-- Loan size -->
            <div class="sib-checkbox-group sib-form-block" data-required="true">
              <div class="form__entry entry_mcq">
                <div class="form__label-row">
                  <label class="entry__label" data-required="*">
                    What loan size are you after?
                  </label>
                  <div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="LOANRANGE[]"
                          data-value="&lt;$500k"
                          value="&lt;$500k"
                          data-required="true"
                        />
                        <span></span>
                        <span>&lt;$500k</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="LOANRANGE[]"
                          data-value="$500k-$750k"
                          value="$500k-$750k"
                          data-required="true"
                        />
                        <span></span>
                        <span>$500k-$750k</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="LOANRANGE[]"
                          data-value="$750k-$1.25m"
                          value="$750k-$1.25m"
                          data-required="true"
                        />
                        <span></span>
                        <span>$750k-$1.25m</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="LOANRANGE[]"
                          data-value="+$1.25m"
                          value="+$1.25m"
                          data-required="true"
                        />
                        <span></span>
                        <span>+$1.25m</span>
                      </label>
                    </div>
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
              </div>
            </div>

            <!-- Plan for current property -->
            <div class="sib-checkbox-group sib-form-block" data-required="true">
              <div class="form__entry entry_mcq">
                <div class="form__label-row">
                  <label class="entry__label" data-required="*">
                    What is the plan for your current property?
                  </label>
                  <div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="PLANFORCURRENTPROPERTY[]"
                          data-value="Sell"
                          value="Sell"
                          data-required="true"
                        />
                        <span></span>
                        <span>Sell</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="PLANFORCURRENTPROPERTY[]"
                          data-value="Rent it out"
                          value="Rent it out"
                          data-required="true"
                        />
                        <span></span>
                        <span>Rent it out</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="PLANFORCURRENTPROPERTY[]"
                          data-value="I am renting"
                          value="I am renting"
                          data-required="true"
                        />
                        <span></span>
                        <span>I am renting</span>
                      </label>
                    </div>
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
              </div>
            </div>

            <!-- Employment type -->
            <div class="sib-checkbox-group sib-form-block" data-required="true">
              <div class="form__entry entry_mcq">
                <div class="form__label-row">
                  <label class="entry__label" data-required="*">
                    How do you get paid?
                  </label>
                  <div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="EMPLOYMENTTYPE[]"
                          data-value="PAYG"
                          value="PAYG"
                          data-required="true"
                        />
                        <span></span>
                        <span>PAYG</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="EMPLOYMENTTYPE[]"
                          data-value="Self employed"
                          value="Self employed"
                          data-required="true"
                        />
                        <span></span>
                        <span>Self employed</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="EMPLOYMENTTYPE[]"
                          data-value="Casual"
                          value="Casual"
                          data-required="true"
                        />
                        <span></span>
                        <span>Casual</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="EMPLOYMENTTYPE[]"
                          data-value="Other"
                          value="Other"
                          data-required="true"
                        />
                        <span></span>
                        <span>Other</span>
                      </label>
                    </div>
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
              </div>
            </div>

            <!-- Income range -->
            <div class="sib-checkbox-group sib-form-block" data-required="true">
              <div class="form__entry entry_mcq">
                <div class="form__label-row">
                  <label class="entry__label" data-required="*">
                    What's your current gross (pre-tax) income?
                  </label>
                  <div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="COMBINEDANNUALINCOME[]"
                          data-value="&lt;$80k"
                          value="&lt;$80k"
                          data-required="true"
                        />
                        <span></span>
                        <span>&lt;$80k</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="COMBINEDANNUALINCOME[]"
                          data-value="$80k–$120k"
                          value="$80k–$120k"
                          data-required="true"
                        />
                        <span></span>
                        <span>$80k–$120k</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="COMBINEDANNUALINCOME[]"
                          data-value="$120k-$180k"
                          value="$120k-$180k"
                          data-required="true"
                        />
                        <span></span>
                        <span>$120k-$180k</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="COMBINEDANNUALINCOME[]"
                          data-value="$180k-$250k"
                          value="$180k-$250k"
                          data-required="true"
                        />
                        <span></span>
                        <span>$180k-$250k</span>
                      </label>
                    </div>
                    <div class="entry__choice">
                      <label class="checkbox__label">
                        <input
                          type="checkbox"
                          class="input_replaced"
                          name="COMBINEDANNUALINCOME[]"
                          data-value="+$250k"
                          value="+$250k"
                          data-required="true"
                        />
                        <span></span>
                        <span>+$250k</span>
                      </label>
                    </div>
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
                <label class="entry__specification">
                  If you're applying for a joint loan, please combine for the figure above.
                </label>
              </div>
            </div>

            <!-- Email -->
            <div class="sib-input sib-form-block">
              <div class="form__entry entry_block">
                <div class="form__label-row">
                  <label
                    class="entry__label"
                    data-required="*"
                    for="EMAIL"
                  >
                    Please enter your email
                  </label>
                  <div class="entry__field">
                    <input
                      class="input"
                      type="text"
                      id="EMAIL"
                      name="EMAIL"
                      autocomplete="off"
                      data-required="true"
                      required
                    />
                  </div>
                </div>
                <label class="entry__error entry__error--primary"></label>
                <label class="entry__specification">
                  Apologies to ask you for your email again, it will ensure your details are mapped correctly.
                </label>
              </div>
            </div>

            <!-- Button -->
            <div class="sib-form-block" style="text-align: left;">
              <button
                class="sib-form-block__button sib-form-block__button-with-loader"
                form="sib-form"
                type="submit"
              >
                Send me my estimate
              </button>
            </div>

            <input type="text" name="email_address_check" value="" class="input--hidden" />
            <input type="hidden" name="locale" value="en" />
          </form>
        </div>
      </div>
    </div>

    <script defer src="https://sibforms.com/forms/end-form/build/main.js"></script>
  </div>
  `;

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
            A few more details about your purchase plans
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            These questions help us understand your deposit, income and general plans so we can match you with lenders who like your kind of deal.
          </p>
          <p className="mt-2 text-sm text-neutral-600">
            Takes around 2 minutes. No credit check, and you can pause any time.
          </p>
        </div>

        <div
          className="mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-10">
          <a href="/" className="btn btn-ghost">
            ← Back to Home
          </a>
        </div>
      </section>
    </main>
  );
}
