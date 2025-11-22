import Script from "next/script";

const brevoRefinanceFormHtml = `
<style>
  /* --- SOLD-wide form styling overrides (same as FHB / Investor / Purchase) --- */
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

  /* Remove Brevo's built-in padding wrapper */
  #sib-form > div[style] {
    padding: 0 !important;
  }

  /* Remove boxy container look */
  .sib-input,
  .sib-form-block,
  .entry__field {
    border: none !important;
    background: transparent !important;
    box-shadow: none !important;
  }

  /* --- PILL INPUTS --- */
  #sib-container .input {
    border-radius: 999px !important;
    border: 1px solid #e2e8f0 !important;
    background: #ffffff !important;
    padding: 14px 20px !important;
    font-size: 15px !important;
    width: 100% !important;
    box-sizing: border-box !important;
    
    margin-top: 4px !important;     /* ↓ tighter gap under label */
    margin-bottom: 4px !important;  /* ↓ pulls “apologies” text closer */
  }

  /* Placeholder colour */
  #sib-container input::placeholder,
  #sib-container textarea::placeholder {
    color: #94a3b8 !important;
  }

  /* --- LABEL SPACING --- */
  #sib-container .entry__label {
    margin-top: 8px !important;   /* ↓ was 12, matches new design rhythm */
    display: block !important;
    font-weight: 700 !important;
  }

  /* Checkbox blocks if used later */
  #sib-container .entry_mcq {
    margin-top: 8px !important;
    margin-bottom: 8px !important;
  }

  #sib-container .sib-checkbox-group {
    margin-bottom: 18px !important;
  }

  /* --- SPECIFICATION / HELP TEXT (email explanation) --- */
  #sib-container .entry__specification {
    margin-top: 4px !important;    /* pulls text closer to pill */
    margin-bottom: 0 !important;
    display: block !important;
    color: #6b7280 !important;
    font-size: 12px !important;
  }

  /* --- BUTTON STYLING --- */
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

  /* Ensure button stays spaced down */
  #sib-form .sib-form-block {
    margin-top: 16px !important;
  }

  #sib-container,
  #sib-container * {
    line-height: 1.2 !important;
  }
</style>

<link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css">

<!-- Start Brevo Form -->
<div class="sib-form" style="text-align:left; background-color:transparent;">
  <div id="sib-form-container" class="sib-form-container">
    <div id="sib-container" class="sib-container--large sib-container--vertical"
      style="background-color:#ffffff; max-width:540px; direction:ltr; border-radius:18px; border:1px dashed #ffffff;">
      
      <form id="sib-form" method="POST"
        action="https://13b359ae.sibforms.com/serve/MUIFAHJ9jPl1LnAAttHRRnYYXKhR1wKFkUPBpqHQLsAgPQ23AqZsvHNvtpnFSP1uW1-i3fruTOY2t_6eZwNhstbVXb0lr6iyMXbLqx2NTKy3q_C-9xdoUAOW9uNob7mCqK4s_VHqaFvniclWBBlUh_QW4qf9fWE7akcwyiyvXvHA_L4ESEokJ8A_1NE1aZDaV7xZDnPECTj4i7qJLQ=="
        data-type="subscription">

        <!-- FIELD: Current loan balance -->
        <div>
          <label class="entry__label" for="TOTALLOANSOUTSTANDING" data-required="*">
            What is your current loan balance ($)?
          </label>
          <input type="text" class="input" id="TOTALLOANSOUTSTANDING" name="TOTALLOANSOUTSTANDING"
            data-required="true" required placeholder="400,000" />
        </div>

        <!-- FIELD: Property value -->
        <div>
          <label class="entry__label" for="PROPERTYVALUE" data-required="*">
            Roughly what is your property&apos;s valuation ($)?
          </label>
          <input type="text" class="input" id="PROPERTYVALUE" name="PROPERTYVALUE"
            data-required="true" required placeholder="1,000,000" />
        </div>

        <!-- FIELD: Years remaining -->
        <div>
          <label class="entry__label" for="YEARSREMAININGONLOAN" data-required="*">
            How long do you have left on your loan (years)
          </label>
          <input type="text" class="input" id="YEARSREMAININGONLOAN" name="YEARSREMAININGONLOAN"
            data-required="true" required placeholder="6" />
        </div>

        <!-- FIELD: Monthly repayments -->
        <div>
          <label class="entry__label" for="MONTHLYREPAYMENTS" data-required="*">
            What are your current monthly repayments ($)
          </label>
          <input type="text" class="input" id="MONTHLYREPAYMENTS" name="MONTHLYREPAYMENTS"
            data-required="true" required placeholder="3,500" />
        </div>

        <!-- FIELD: Interest rate -->
        <div>
          <label class="entry__label" for="CURRENTRATE" data-required="*">
            What is your current interest rate (%)
          </label>
          <input type="text" class="input" id="CURRENTRATE" name="CURRENTRATE"
            data-required="true" required placeholder="5.50" />
        </div>

        <!-- FIELD: Email -->
        <div>
          <label class="entry__label" for="EMAIL" data-required="*">
            Enter your email
          </label>

          <input type="text" class="input" id="EMAIL" name="EMAIL" data-required="true" required />

          <span class="entry__specification">
            Apologies to ask you for your email again, it will ensure your details are mapped correctly.
          </span>
        </div>

        <!-- BUTTON -->
        <div class="sib-form-block" style="text-align:left;">
          <button class="sib-form-block__button" type="submit">
            Send me my estimate
          </button>
        </div>

        <input type="hidden" name="locale" value="en" />
      </form>
    </div>
  </div>
</div>
<!-- End Brevo Form -->
`;

export default function RefinanceStepTwoPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Brevo config scripts */}
      <Script id="brevo-config-ref2" strategy="lazyOnload">
        {`
          window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
          window.LOCALE = 'en';
          window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE =
            "The information provided is invalid. Please review the field format and try again.";
          window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank.";
          window.GENERIC_INVALID_MESSAGE =
            "The information provided is invalid. Please review the field format and try again.";
          window.INVALID_NUMBER =
            "The information provided is invalid. Please review the field format and try again.";
          var AUTOHIDE = Boolean(0);
        `}
      </Script>

      <Script
        id="brevo-main-ref2"
        src="https://sibforms.com/forms/end-form/build/main.js"
        strategy="lazyOnload"
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-black">
            A few numbers so we can estimate your savings
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-700">
            Tell us about your current loan, repayments and rate. We’ll use this to
            estimate your potential savings and see which lenders might make sense —
            no credit check required.
          </p>
        </div>

        <div
          className="mt-10 max-w-xl"
          dangerouslySetInnerHTML={{ __html: brevoRefinanceFormHtml }}
          suppressHydrationWarning
        />
      </section>
    </main>
  );
}
