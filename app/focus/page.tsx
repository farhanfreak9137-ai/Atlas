"use client";

import { useEffect } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { usePhoneControlStore } from "@/stores/phone-control.store";
import { FocusScreenTimeCard } from "@/components/focus/FocusScreenTimeCard";
import { FocusAppRulesCard } from "@/components/focus/FocusAppRulesCard";
import { FocusUnlockConditionsCard } from "@/components/focus/FocusUnlockConditionsCard";
import { FocusDisciplineModeCard } from "@/components/focus/FocusDisciplineModeCard";

export default function FocusPage() {
  const { load } = usePhoneControlStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8 pb-12">
      <PageHeader
        eyebrow="Productivity"
        title="Focus & Device Control"
        description="Enforce strict daily screen-time limits, app blacklists, bedtime quiet hours, and AI camera workout lockouts."
      />

      <div className="space-y-6 sm:space-y-8">
        <FocusScreenTimeCard />
        <FocusUnlockConditionsCard />
        <FocusAppRulesCard />
        <FocusDisciplineModeCard />
      </div>
    </div>
  );
}
