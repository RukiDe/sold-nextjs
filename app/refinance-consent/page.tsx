// app/refinance-consent/page.tsx
"use client";

import React from "react";

const brevoFormHtml = `
<div class="sib-form" style="text-align:left; background-color:transparent;">
  <div id="sib-form-container" class="sib-form-container">

    <!-- Hide Brevo error/success panels (Brevo will still manage state internally) -->
    <div id="error-message"
         class="sib-form-message-panel"
         style="display:none; font-size:16px; text-align:left; font-family:Helvetica, sans-serif;
                color:#661d1d; background-color:#ffeded; border-radius:3px; border-color:#ff4949; max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <span class="sib-form-message-panel__inner-text">
          Something didn't work. Please give it another shot.
        </span>
      </div>
    </div>

    <div id="success-message"
         class="sib-form-message-panel"
         style="display:none; font-size:16px; text-align:left; font-family:Helvetica, sans-serif;
                color:#085229; background-color:#e7faf0; border-radius:3px; border-color:#13ce66; max-width:540px;">
      <div class="sib-form-message-panel__text sib-form-message-panel__text--center">
        <span class="sib-form-message-panel__inner-text">
          You'll receive an email from us shortly (check your spam folder).
        </span>
      </div>
    </div>

    <div id="sib-container"
         class="sib-container--large sib-container--vertical"
         style="
           text-align:left;
           background-color:#ffffff;
           max-width:100%;
           border-radius:32px;
           border-width:1px;
           border-style:solid;
           border-color:#E5E7EB;
           padding:32px 24px;
           box-sizing:border-box;
         ">

      <form id="sib-form"
            method="POST"
            action="https://13b359ae.sibforms.com/serve/MUIFAIUlO5PrCVpUANOwmZyGyLq32IqH_Q9H6FKQ5oHuiLcTu0669rOnHcC_PZUCJ6u8c3gl0jPk7r6-Uj5TkYCPzq71KrWPu1wDjq18DGwUfNuRWiCieaAcUsLMJyztx7U9p6_c6KoSRNCoTqqpsmGI5WhxqzRdX3xYtz2SfRuRVY2N7fayXkK9TJes8ceITzRJAOxTMfRDmi7pdQ=="
            data-type="subscription"
            style="margin:0; padding:0;">
        
        <!-- Preferred name -->
        <div style="margin-bottom:18px;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row">
                <div class="entry__field">
                  <input
                    maxlength="200"
                    type="text"
                    id="FIRSTNAME"
                    name="FIRSTNAME"
                    autocomplete="off"
                    placeholder="Preferred Name"
                    data-required="true"
                    required
                    class="input sold-input"
                    style="
                      width:100%;
                      box-sizing:border-box;
                      border-radius:9999px;
                      border:1px solid #E5E7EB;
                      padding:14px 20px;
                      font-size:16px;
                      line-height:1.5;
                      color:#111827;
                      background-color:#F9FAFB;
                      outline:none;
                    "
                  />
                </div>
              </div>
              <label class="entry__error entry__error--primary"
                     style="display:none; font-size:14px; margin-top:6px; color:#B91C1C;"></label>
            </div>
          </div>
        </div>

        <!-- Email -->
        <div style="margin-bottom:18px;">
          <div class="sib-input sib-form-block">
            <div class="form__entry entry_block">
              <div class="form__label-row">
                <div class="entry__field">
                  <input
                    type="text"
                    id="EMAIL"
                    name="EMAIL"
                    autocomplete="off"
                    placeholder="Email"
                    data-required="true"
                    required
                    class="input sold-input"
                    style="
                      width:100%;
                      box-sizing:border-box;
                      border-radius:9999px;
                      border:1px solid #E5E7EB;
                      padding:14px 20px;
                      font-size:16px;
                      line-height:1.5;
                      color:#111827;
                      background-color:#F9FAFB;
                      outline:none;
                    "
                  />
                </div>
              </div>
              <label class="entry__error entry__error--primary"
                     style="display:none; font-size:14px; margin-top:6px; color:#B91C1C;"></label>
              <label class="entry__specification"
                     style="font-size:13px; margin-top:8px; display:block; color:#6B7280;">
                We'll send you our privacy and consent form to sign (check your spam folder).
              </label>
            </div>
          </div>
        </div>

        <!-- Submit -->
        <div style="margin-top:18px;">
          <button
            class="sib-form-block__button sib-form-block__button-with-loader"
            type="submit"
            style="
              display:inline-block;
              width:100%;
              max-width:420px;
              background-color:#0B0F1B;
              color:#FFFFFF;
              font-weight:600;
              font-size:17px;
              border-radius:9999px;
              padding:14px 28px;
              border:1px solid #0B0F1B;
              text-align:center;
              cursor:pointer;
              transition:all 150ms ease-in-out;
            "
            onmouseover="this.style.backgroundColor='#FFFFFF'; this.style.color='#000000'; this.style.borderColor='#000000';"
            onmouseout="this.style.backgroundColor='#0B0F1B'; this.style.color='#FFFFFF'; this.style.borderColor='#0B0F1B';"
          >
            I'm ready for the next steps
          </button>
        </div>

        <input type="text" name="email_address_check" value="" class="input--hidden">
        <input type="hidden" name="locale" value="en">
      </form>
    </div>
  </div>
</div>
`;

export default function RefiConsent() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Intro copy */}
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
            Refinance your loan, properly.
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-700">
            This is the first step in giving your home loan a health check, without the pressure
            of sitting in a branch or being sold to. We'll sense-check your current rate and
            repayments against what's available on the market today.
          </p>
          <ul className="mt-4 space-y-1 text-base sm:text-lg text-neutral-800">
            <li>• No credit check at this stage.</li>
            <li>• We work for you, not lenders.</li>
            <li>• We only recommend a move if it actually puts you ahead and you're feeling comfy.</li>
          </ul>
        </div>

        {/* Progress bar */}
        <div className="mt-10">
          <div className="h-2 rounded-full bg-neutral-200 overflow-hidden">
            {/* Step 1 of 3 (Consent) */}
            <div className="h-full w-1/3 bg-black rounded-full" />
          </div>
          <div className="mt-3 flex justify-between text-sm font-medium text-neutral-500">
            <span className="text-black">Consent</span>
            <span>Digital fact find</span>
            <span>Options</span>
          </div>
        </div>

        {/* Form */}
        <div className="mt-10 max-w-3xl">
          <div
            dangerouslySetInnerHTML={{ __html: brevoFormHtml }}
          />
        </div>
      </div>
    </main>
  );
}
