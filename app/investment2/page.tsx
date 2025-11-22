// app/investment2/page.tsx
import Link from "next/link";

export default function InvestmentRoundTwoPage() {
  const html = `
  <style>
    /* Hide Brevo success / error panels */
    #error-message,
    #success-message {
      display: none !important;
    }

    /* Align + Sold styling */
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

    #sib-form {
      text-align: left !important;
    }

    /* Flatten Brevo's inline padding wrappers */
    #sib-form > div[style] {
      padding: 0 !important;
    }

    /* Remove Brevo default borders / box styles */
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
      margin-top: 6px !important;
      margin-bottom: 10px !important;
    }

    /* Placeholders */
    #sib-container input::placeholder,
    #sib-container textarea::placeholder {
      color: #94a3b8 !important;
    }

    /* Labels */
    #sib-container .entry__label {
      margin-top: 12px !important;
      margin-bottom: 2px !important;
      display: block !important;
      font-weight: 700 !important;
      color: #111827 !important;
    }

    /* Checkbox groups */
    #sib-container .entry_mcq {
      margin-top: 8px !important;
      margin-bottom: 10px !important;
    }

    #sib-container .sib-checkbox-group {
      margin-bottom: 14px !important;
    }

    .checkbox__label {
      display: flex !important;
      align-items: center !important;
      margin: 4px 0 !important;
    }

    /* Nudge checkbox text right so boxes aren’t sitting on the letters */
    .checkbox__label span:last-child {
      padding-left: 22px !important;
    }

    /* Helper text under fields */
    #sib-container .entry__specification {
      margin-top: 4px !important;
      font-size: 12px !important;
      color: #6b7280 !important;
    }

    /* Button – same as other flows */
    #sib-container .sib-form-block__button {
      border-radius: 999px !important;
      padding: 14px 24px !important;
      font-weight: 600 !important;
      font-size: 15px !important;
      background-color: #111827 !important;
      border: 1px solid #111827 !important;
      color: #ffffff !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      margin-top: 6px !important;
    }

    #sib-container .sib-form-block__button:hover {
      background-color: #ffffff !important;
      color: #111827 !important;
    }

    /* Hide Brevo loader icon so we don't get a weird circle */
    #sib-container .sib-form-block__button svg {
      display: none !important;
    }

    #sib-container,
    #sib-container * {
      line-height: 1.3 !important;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Text",
        "Helvetica Neue", Arial, sans-serif !important;
    }
  </style>

  <div class="sib-form" style="background-color: transparent;">
    <div id="sib-form-container" class="sib-form-container">
      <div id="sib-container" class="sib-container--large sib-container--vertical">
        <form id="sib-form" method="POST"
          action="https://13b359ae.sibforms.com/serve/MUIFAOIZzy4_aTdNAhlhRrIAPMnWUuRhR0CYUI7ZL4yL4soRlJeRsB4ifZs8nZ9xRyqAYwNb4FnwJl6xvCvawPBn0vKMktIYSD4SJP4BHPDD_bfbMl8qaqDL54evKNdozfPHG3mFK6HpPAioKIfGzpFS5UmOiMJsQXJsdsMoipxMjjWKAbDaiO6n9gKTu6QW8fGLqe8dMRzwdFRy1A=="
          data-type="subscription">

          <!-- Investment goal -->
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row">
                <label class="entry__label" data-required="*">
                  What category of investment loan are you after?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MAININVESTMENTGOAL[]" value="Cashflow" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>Cashflow</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MAININVESTMENTGOAL[]" value="Growth" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>Growth</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MAININVESTMENTGOAL[]" value="Diversification" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>Diversification</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MAININVESTMENTGOAL[]" value="SMSF" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>SMSF</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Rental income -->
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row">
                <label class="entry__label" for="GROSSANNUALRENTALINCOME" data-required="*">
                  What is your current rental income per month?
                </label>
                <div class="entry__field">
                  <input maxlength="200" type="text" data-numeric="true" class="input"
                    id="GROSSANNUALRENTALINCOME" name="GROSSANNUALRENTALINCOME"
                    autocomplete="off" data-required="true" required />
                </div>
              </div>
              <label class="entry__specification">
                Enter 0 if none.
              </label>
            </div>
          </div>

          <!-- Gross income -->
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row">
                <label class="entry__label" data-required="*">
                  What is your gross (pre-tax) income?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="COMBINEDANNUALINCOME[]" value="&lt;$80k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>&lt;$80k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="COMBINEDANNUALINCOME[]" value="$80k–$120k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$80k–$120k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="COMBINEDANNUALINCOME[]" value="$120k-$180k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$120k–$180k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="COMBINEDANNUALINCOME[]" value="$180k-$250k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$180k–$250k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="COMBINEDANNUALINCOME[]" value="+$250k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>+$250k</span>
                    </label>
                  </div>
                </div>
              </div>
              <label class="entry__specification">
                If it’s a joint loan, please combine amounts for the question above.
              </label>
            </div>
          </div>

          <!-- Monthly living expenses -->
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row">
                <label class="entry__label" data-required="*">
                  Roughly what are your monthly living expenses?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MONTHLYLIVINGEXPENSES[]" value="&lt;$2k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>&lt;$2k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MONTHLYLIVINGEXPENSES[]" value="$2k–$4k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$2k–$4k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MONTHLYLIVINGEXPENSES[]" value="$4k–$8k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$4k–$8k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MONTHLYLIVINGEXPENSES[]" value="$8k–$12k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>$8k–$12k</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="MONTHLYLIVINGEXPENSES[]" value="+12k" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>+12k</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Timeframe -->
          <div class="sib-checkbox-group sib-form-block" data-required="true">
            <div class="form__entry entry_mcq">
              <div class="form__label-row">
                <label class="entry__label" data-required="*">
                  What time period do you need the loan?
                </label>
                <div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="BUYINGTIMEFRAME[]" value="ASAP" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>ASAP</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="BUYINGTIMEFRAME[]" value="1–3 months" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>1–3 months</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="BUYINGTIMEFRAME[]" value="3–6 months" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>3–6 months</span>
                    </label>
                  </div>
                  <div class="entry__choice">
                    <label class="checkbox__label">
                      <input type="checkbox" class="input_replaced" name="BUYINGTIMEFRAME[]" value="+6 months" data-required="true" />
                      <span class="checkbox checkbox_tick_positive"></span>
                      <span>+6 months</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row">
                <label class="entry__label" for="EMAIL" data-required="*">
                  Please enter your email
                </label>
                <div class="entry__field">
                  <input class="input" type="text" id="EMAIL" name="EMAIL"
                    autocomplete="off" placeholder="EMAIL" data-required="true" required />
                </div>
              </div>
              <label class="entry__specification">
                Apologies to ask you again, it’ll ensure details are mapped accurately.
              </label>
            </div>
          </div>

          <!-- Submit -->
          <div class="sib-form-block" style="text-align: left;">
            <button class="sib-form-block__button sib-form-block__button-with-loader" form="sib-form" type="submit">
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
  `;

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-black">
          A few more details about your investment plans
        </h1>
        <p className="mt-4 text-base sm:text-lg text-neutral-700">
          These questions help us understand your income, rental position and
          investment goals so we can match you with lenders who like your kind
          of deal.
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          Takes around 2 minutes. No credit check, and you can pause any time.
        </p>

        <div className="mt-8" dangerouslySetInnerHTML={{ __html: html }} />

        <div className="mt-10">
          <Link href="/" className="text-sm text-neutral-500 hover:text-neutral-800 underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
