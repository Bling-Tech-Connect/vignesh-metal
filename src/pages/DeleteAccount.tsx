import { useState } from 'react';
import LegalPageLayout from '../components/LegalPageLayout';

const SUPPORT_EMAIL = 'vigneshsuperstores@gmail.com';
const inputClass =
  'w-full border border-brand-border px-4 py-3 text-sm text-brand-dark outline-none focus:border-primary transition-colors placeholder-brand-text bg-white';
const labelClass = 'block text-xs text-brand-text uppercase tracking-wider mb-2';

export default function DeleteAccount() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    scope: 'account',
    reason: '',
    confirm: false,
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const v = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: v }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scopeText =
      form.scope === 'account'
        ? 'Delete my account and all associated data'
        : 'Delete only some of my data (details below)';
    const body = [
      'Account / data deletion request - Vignesh Metals app',
      '',
      `Name: ${form.name}`,
      `Registered email: ${form.email}`,
      `Registered phone: ${form.phone}`,
      `Request: ${scopeText}`,
      form.reason ? `Details: ${form.reason}` : null,
      '',
      'I confirm that I am the owner of this account and understand this cannot be undone.',
    ]
      .filter((l): l is string => l !== null)
      .join('\n');

    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
      'Account Deletion Request - Vignesh Metals'
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <LegalPageLayout title="Delete Account" eyebrow="Your Data, Your Choice" lastUpdated="20 July 2026">
      <p>
        This page lets you request deletion of your account and personal data for the
        <strong> Vignesh Metals</strong> app by Vignesh Super Store. Fill in the form below
        and we will verify and process your request.
      </p>

      <h2>How to Request Deletion</h2>
      <ol>
        <li>Fill in the form below using the same name, email, and phone number you used in the app.</li>
        <li>Press &ldquo;Submit Request&rdquo;. Your email app will open with the request pre-filled &ndash; press Send.</li>
        <li>We may contact you to verify your identity.</li>
        <li>Your data will be deleted within 30 days of verification, and we will confirm by email.</li>
      </ol>
      <p>
        You can also email us directly at <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{' '}
        with the subject &ldquo;Account Deletion Request&rdquo;.
      </p>

      <h2>Request Form</h2>
      <form onSubmit={handleSubmit} className="space-y-5 mb-8 not-prose">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelClass}>Full Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Your full name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone *</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="+91 XXXXX XXXXX" className={inputClass} />
          </div>
        </div>
        <div>
          <label className={labelClass}>Registered Email *</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>What would you like to delete? *</label>
          <select name="scope" value={form.scope} onChange={handleChange} className={inputClass}>
            <option value="account">My entire account and all associated data</option>
            <option value="partial">Only some of my data (specify below)</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Details / Reason (optional)</label>
          <textarea name="reason" value={form.reason} onChange={handleChange} rows={4} placeholder="Tell us anything that helps us process your request..." className={`${inputClass} resize-none`} />
        </div>
        <label className="flex items-start gap-3 text-sm text-brand-text cursor-pointer">
          <input type="checkbox" name="confirm" checked={form.confirm} onChange={handleChange} required className="mt-1" />
          <span>I confirm I am the owner of this account and understand that deletion is permanent and cannot be undone.</span>
        </label>
        <button type="submit" className="btn-primary w-full">Submit Request</button>
        {sent && (
          <p className="text-sm text-primary">
            Your email app should have opened. If not, please email us at{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
        )}
      </form>

      <h2>What Gets Deleted</h2>
      <ul>
        <li>Your name, phone number, and email address</li>
        <li>Your enquiries, messages, and communication records</li>
        <li>Any other personal information linked to your account</li>
      </ul>

      <h2>What May Be Retained</h2>
      <p>
        Where required by law (for example, tax or accounting records for completed
        purchases), we may retain limited transaction information for the legally required
        period. This data is kept securely and is not used for any other purpose.
      </p>

      <h2>Contact Us</h2>
      <ul>
        <li>Email: <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></li>
        <li>Phone: <a href="tel:+919876543210">+91 98765 43210</a></li>
        <li>Address: Sri Vignesh Metal, 13, Paramasiva Street, Park Town, Chennai – 600003, Tamil Nadu</li>
      </ul>
    </LegalPageLayout>
  );
}