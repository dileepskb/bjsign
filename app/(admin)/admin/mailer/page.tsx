"use client";

import { useState } from "react";
import Papa from "papaparse";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

type EmailRow = {
  email: string;
  selected: boolean;
};

export default function MailerPage() {
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState("");
  const [sending, setSending] = useState(false);

  // CSV Upload Handler
  const handleCSVUpload = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsed = result.data as { email: string }[];
        const list = parsed
          .filter((row) => row.email)
          .map((row) => ({
            email: row.email.trim(),
            selected: true,
          }));
        setEmails(list);
      },
    });
  };

  // Toggle selection
  const toggleEmail = (index: number) => {
    setEmails((prev) =>
      prev.map((e, i) =>
        i === index ? { ...e, selected: !e.selected } : e
      )
    );
  };

  // Send Emails
const sendEmails = async () => {
  const selectedEmails = emails
    .filter((e) => e.selected)
    .map((e) => e.email);

  if (!selectedEmails.length) {
    alert("Select at least one email");
    return;
  }

  setSending(true);

  try {
    const res = await fetch("/api/sendmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        emails: selectedEmails,
        subject,
        html,
      }),
    });

    // ✅ check before parsing
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Server error");
    }

    // ✅ safely parse JSON
    const text = await res.text();
    const data = text ? JSON.parse(text) : {};
    console.log(data)
    alert("Emails sent successfully ✅");
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Failed to send emails");
  } finally {
    setSending(false);
  }
};

  return (
    <>
     <Breadcrumb pageName="Mailer" />

      <div className="relative overflow-x-auto border border-gray-300 rounded p-3 bg-white dark:bg-gray-900">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 ">
    <div className="w-full mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📧 Mini Mailchimp</h1>

      {/* CSV Upload */}
      <div>
        <label className="font-medium">Upload CSV</label>
        <input
          type="file"
          accept=".csv"
          className="block mt-2"
          onChange={(e) =>
            e.target.files && handleCSVUpload(e.target.files[0])
          }
        />
      </div>

      {/* Email List */}
      {emails.length > 0 && (
        <div className="border rounded p-4 max-h-60 overflow-auto">
          <h2 className="font-semibold mb-2">
            Emails ({emails.length})
          </h2>

          {emails.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleEmail(index)}
              />
              {item.email}
            </label>
          ))}
        </div>
      )}

      {/* Subject */}
      <div>
        <label className="font-medium">Subject</label>
        <input
          className="w-full border p-2 rounded mt-1"
          placeholder="Email subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      {/* HTML Mailer */}
      <div>
        <label className="font-medium">HTML Mail Content</label>
        <textarea
          className="w-full border p-2 rounded mt-1 h-60 font-mono"
          placeholder="<h1>Hello</h1><p>This is a mail</p>"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      </div>

      {/* Send Button */}
      <button
        onClick={sendEmails}
        disabled={sending}
        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {sending ? "Sending..." : "Send Selected Emails"}
      </button>
    </div>
    </div>
    </div>
    </>
  );
}