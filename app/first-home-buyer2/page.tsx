import Script from "next/script";

const brevoFhbFormHtml = `
<style>
  /* --- Shared SOLD form styling (same as refinance2 etc.) --- */
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

  #sib-form > div[style] {
    padding: 0 !important;
  }

  .sib-input,
  .sib-form-block,
  .entry__field {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  /* Pill-style text inputs */
  #sib-container .input {
    border-radius: 999px !important;
    border: 1px solid #e2e8f0 !important;
    background: #ffffff !important;
    padding: 14px 20px !important;
    font-size: 15px !important;
    width: 100% !important;
    box-sizing: border-box !important;

    margin-top: 4px !important;
    margin-bottom: 4px !important;
  }

  #sib-container input::placeholder,
  #sib-container textarea::placeholder {
    color: #94a3b8 !important;
  }

  /* Labels */
  #sib-container .entry__label {
    margin-top: 8px !important;
    display: block !important;
    font-weight: 700 !important;
  }

  /* Checkbox layout – kill Brevo's faux button styling */
  .checkbox__label {
    display: inline-flex !important;
    align-items: center !important;
    gap: 8px !important;
    background: transparent !important;
    border: none !important;
    padding: 2px 0 !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }

  .checkbox__label input[type="checkbox"] {
    width: 16px !important;
    height: 16px !important;
    appearance: auto !important;
    -webkit-appearance: checkbox !important;
    -moz-appearance: checkbox !important;
    margin: 0 !important;
  }

  /* Hide Brevo's decorative checkbox box if present */
  .checkbox {
    display: none !important;
  }

  /* Nudge checkbox label text to the right */
.checkbox__label span:last-child {
  padding-left: 22px !important;
  display: inline-block !important;
}


  #sib-container .entry_mcq {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }

  #sib-container .sib-checkbox-group {
    margin-bottom: 18px !important;
  }

  /* Helper / spec text */
  #sib-container .entry__specification {
    margin-top: 4px !important;
    margin-bottom: 0 !important;
    display: block !important;
    color: #6b7280 !important;
    font-size: 12px !important;
  }

  /* Button */
  #sib-container .sib-form-block__button {
    border-radius: 999px !important;
    padding: 14px 24px !important;
    font-weight: 600 !important;
    font-size: 16px !important;
    background-color: #111827 !important;
    border: 1px solid #111827 !important;
    color: #ffffff !important;
  }

  #sib-container .sib-form-block__button:hover {
    background-color: #ffffff !important;
    color: #111827 !important;
  }

  #sib-form .sib-form-block {
    margin-top: 16px !important;
  }

  #sib-container,
  #sib-container * {
    line-height: 1.2 !important;
  }
</style>

<link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css">

<!-- Begin Brevo Form – FHB step 2 -->
<div class="sib-form" style="text-align:left; background-color:transparent;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="sib-container"
         class="sib-container--large sib-container--vertical"
         style="background-color:#ffffff; max-width:540px; direction:ltr; border-radius:18px; border:1px dashed #ffffff;">

      <form id="sib-form"
            method="POST"
            action="https://13b359ae.sibforms.com/serve/MUIFAGlDGlVskMDuJbStJz_DGUmYxrj9vsC5Ipm6m1SAnlq7hXKz0mZE8uiV3jDyXR2pSvjJyhPu9qV8BijtJb17s5VtCfhF2jOlMW2cUD7G13myCSDhkLEJg-G0e6fNUHiqtLcE-q9H2JmaUxjkxzkHJeARXLK4mh_IIre35NgFQgLQyjbuyCvPuj3_i0PCvU_3KQAv1pbvjmem6Q=="
            data-type="subscription">

        <!-- Do you qualify for the First Home Buyer Scheme? -->
        <div>
          <label class="entry__label" data-required="*">
            Do you qualify for the First Home Buyer Scheme?
          </label>
          <div class="sib-checkbox-group">
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="ELIGIBLEFIRSTHOMESCHEME[]" value="Yes" data-required="true" />
                <span>Yes</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="ELIGIBLEFIRSTHOMESCHEME[]" value="No" data-required="true" />
                <span>No</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="ELIGIBLEFIRSTHOMESCHEME[]" value="Not sure" data-required="true" />
                <span>Not sure</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Where does your income come from? -->
        <div>
          <label class="entry__label" data-required="*">
            Where does your income come from?
          </label>
          <div class="sib-checkbox-group">
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="EMPLOYMENTTYPE[]" value="PAYG" data-required="true" />
                <span>PAYG</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="EMPLOYMENTTYPE[]" value="Self employed" data-required="true" />
                <span>Self employed</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="EMPLOYMENTTYPE[]" value="Casual" data-required="true" />
                <span>Casual</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="EMPLOYMENTTYPE[]" value="Other" data-required="true" />
                <span>Other</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Do you have any of these loans? -->
        <div>
          <label class="entry__label" data-required="*">
            Do you have any of these loans?
          </label>
          <div class="sib-checkbox-group">
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="EXISTINGDEBTS[]" value="Credit card" data-required="true" />
                <span>Credit card</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="EXISTINGDEBTS[]" value="HECS" data-required="true" />
                <span>HECS</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="EXISTINGDEBTS[]" value="Car loan" data-required="true" />
                <span>Car loan</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="EXISTINGDEBTS[]" value="Investment property" data-required="true" />
                <span>Investment property</span>
              </label>
            </div>
          </div>
        </div>

        <!-- What loan size are you after? -->
        <div>
          <label class="entry__label" data-required="*">
            What loan size are you after?
          </label>
          <div class="sib-checkbox-group">
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="LOANRANGE[]" value="&lt;$500k" data-required="true" />
                <span>&lt;$500k</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="LOANRANGE[]" value="$500k-$750k" data-required="true" />
                <span>$500k-$750k</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="LOANRANGE[]" value="$750k-$1.25m" data-required="true" />
                <span>$750k-$1.25m</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="LOANRANGE[]" value="+$1.25m" data-required="true" />
                <span>+$1.25m</span>
              </label>
            </div>
          </div>
          <span class="entry__specification">
            After accounting for your deposit.
          </span>
        </div>

        <!-- When do you need the loan? -->
        <div>
          <label class="entry__label" data-required="*">
            When do you need the loan?
          </label>
          <div class="sib-checkbox-group">
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="BUYINGTIMEFRAME[]" value="ASAP" data-required="true" />
                <span>ASAP</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="BUYINGTIMEFRAME[]" value="1–3 months" data-required="true" />
                <span>1–3 months</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="BUYINGTIMEFRAME[]" value="3–6 months" data-required="true" />
                <span>3–6 months</span>
              </label>
            </div>
            <div class="entry__choice">
              <label class="checkbox__label">
                <input type="checkbox" name="BUYINGTIMEFRAME[]" value="+6 months" data-required="true" />
                <span>+6 months</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Preferred suburb -->
        <div>
          <label class="entry__label" for="PREFERREDSUBURBS" data-required="*">
            What&apos;s your preferred suburb?
          </label>
          <input class="input"
                 maxlength="200"
                 type="text"
                 id="PREFERREDSUBURBS"
                 name="PREFERREDSUBURBS"
                 autocomplete="off"
                 data-required="true"
                 required />
        </div>

        <!-- Email -->
        <div>
          <label class="entry__label" for="EMAIL" data-required="*">
            Please enter your email address
          </label>
          <input class="input"
                 type="text"
                 id="EMAIL"
                 name="EMAIL"
                 autocomplete="off"
                 data-required="true"
                 required />
          <span class="entry__specification">
            Apologies to ask again, it&apos;ll ensure everything is mapped correctly.
          </span>
        </div>

        <!-- Button -->
        <div class="sib-form-block" style="text-align:left;">
          <button class="sib-form-block__button" type="submit">
            I&apos;m ready for the next steps
          </button>
        </div>

        <input type="hidden" name="email_address_check" value="" />
        <input type="hidden" name="locale" value="en" />
      </form>
    </div>
  </div>
</div>
<!-- End Brevo Form -->
`;

export default function FirstHomeBuyerStepTwoPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Brevo config scripts */}
      <Script id="brevo-config-fhb2" strategy="lazyOnload">
        {`
          window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
          window.LOCALE = 'en';
          window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
            "The information provided is invalid. Please review the field format and try again.";
          window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
          window.GENERIC_INVALID_MESSAGE =
            "The information provided is invalid. Please review the field format and try again.";
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
        id="brevo-main-fhb2"
        src="https://sibforms.com/forms/end-form/build/main.js"
        strategy="lazyOnload"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-black">
            A few more details for your first home
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-700">
            We&apos;ll use your answers to check scheme eligibility, existing debts,
            and a rough borrowing range across different lenders — without a credit check.
          </p>
        </div>

        <div
          className="mt-10 max-w-xl"
          dangerouslySetInnerHTML={{ __html: brevoFhbFormHtml }}
          suppressHydrationWarning
        />
      </section>
    </main>
  );
}
