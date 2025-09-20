import React, { useMemo, useState } from "react";
import {
  AvatarQuality,
  ElevenLabsModel,
  STTProvider,
  VoiceEmotion,
  StartAvatarRequest,
  VoiceChatTransport,
} from "@heygen/streaming-avatar";

import { Input } from "@/components/ui/input";
import { Select } from "../Select";
import { Field } from "./Field";
import { useI18n } from '@/lib/i18n/context';

import { AVATARS, STT_LANGUAGE_LIST } from "@/app/lib/constants";

interface AvatarConfigProps {
  onConfigChange: (config: StartAvatarRequest) => void;
  config: StartAvatarRequest;
  onClose?: () => void;
}

export const AvatarConfig: React.FC<AvatarConfigProps> = ({
  onConfigChange,
  config,
  onClose,
}) => {
  const [showMore, setShowMore] = useState(false);
  const { t } = useI18n();

  const onChange = <T extends keyof StartAvatarRequest>(
    key: T,
    value: StartAvatarRequest[T],
  ) => {
    if (key === "language") {
      // Sync language with STT settings
      onConfigChange({
        ...config,
        [key]: value,
        sttSettings: {
          ...config.sttSettings,
          language: value as string
        }
      });
    } else if (key === "voice") {
      onConfigChange({
        ...config,
        voice: {
          ...config.voice,
          ...(value as Partial<StartAvatarRequest['voice']>)
        } as StartAvatarRequest['voice']
      });
    } else if (key === "ttsSettings") {
      onConfigChange({
        ...config,
        ttsSettings: {
          ...config.ttsSettings,
          ...(value as Partial<StartAvatarRequest['ttsSettings']>)
        } as StartAvatarRequest['ttsSettings']
      });
    } else if (key === "sttSettings") {
      onConfigChange({
        ...config,
        sttSettings: {
          ...config.sttSettings,
          ...(value as Partial<StartAvatarRequest['sttSettings']>)
        } as StartAvatarRequest['sttSettings']
      });
    } else {
      onConfigChange({
        ...config,
        [key]: value,
      });
    }
  };

  const selectedAvatar = useMemo(() => {
    const avatar = AVATARS.find(
      (avatar) => avatar.avatar_id === config.avatarName,
    );

    if (!avatar) {
      return {
        isCustom: true,
        name: "Custom Avatar ID",
        avatarId: null,
      };
    } else {
      return {
        isCustom: false,
        name: avatar.name,
        avatarId: avatar.avatar_id,
      };
    }
  }, [config.avatarName]);

  return (
    <div className="relative flex flex-col gap-4 w-full max-w-2xl mx-auto py-4 max-h-full overflow-y-auto px-4">
      {/* Close button if onClose is provided */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-zinc-400 hover:text-white text-2xl"
        >
          ×
        </button>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label={t.assistant.avatarConfig.knowledgeBaseId}>
          <Input
            placeholder="Enter custom knowledge base ID"
            value={config.knowledgeId || ""}
            onChange={(e) => onChange("knowledgeId", e.target.value || undefined)}
          />
        </Field>
        <Field label={t.assistant.avatarConfig.avatarId}>
          <Select
            isSelected={(option) =>
              typeof option === "string"
                ? !!selectedAvatar?.isCustom
                : option.avatar_id === selectedAvatar?.avatarId
            }
            options={[...AVATARS, "CUSTOM"]}
            placeholder="Select Avatar"
            renderOption={(option) => {
              return typeof option === "string"
                ? "Custom Avatar ID"
                : option.name;
            }}
            value={
              selectedAvatar?.isCustom ? "Custom Avatar ID" : selectedAvatar?.name
            }
            onSelect={(option) => {
              if (typeof option === "string") {
                onChange("avatarName", "");
              } else {
                onChange("avatarName", option.avatar_id);
              }
            }}
          />
        </Field>
        {selectedAvatar?.isCustom && (
          <Field label={t.assistant.avatarConfig.avatarId}>
            <Input
              placeholder="Enter custom avatar ID"
              value={config.avatarName || ""}
              onChange={(e) => onChange("avatarName", e.target.value)}
            />
          </Field>
        )}
        <Field label={t.assistant.avatarConfig.language}>
          <Select
            isSelected={(option) => option.value === config.language}
            options={STT_LANGUAGE_LIST}
            renderOption={(option) => option.label}
            value={
              STT_LANGUAGE_LIST.find((option) => option.value === config.language)
                ?.label
            }
            onSelect={(option) => onChange("language", option.value)}
          />
        </Field>
        <Field label={t.assistant.avatarConfig.quality}>
          <Select
            isSelected={(option) => option === config.quality}
            options={Object.values(AvatarQuality)}
            renderOption={(option) => option}
            value={config.quality}
            onSelect={(option) => onChange("quality", option)}
          />
        </Field>
        <Field label={t.assistant.avatarConfig.voiceChatTransport}>
          <Select
            isSelected={(option) => option === config.voiceChatTransport}
            options={Object.values(VoiceChatTransport)}
            renderOption={(option) => option}
            value={config.voiceChatTransport}
            onSelect={(option) => onChange("voiceChatTransport", option)}
          />
        </Field>
      </div>

      {showMore && (
        <>
          <h1 className="text-zinc-100 w-full text-center mt-4 text-lg font-bold">
            {t.assistant.avatarConfig.voiceSettings}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t.assistant.avatarConfig.rate}>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                max="3"
                placeholder="1.5"
                value={config.voice?.rate || 1.5}
                onChange={(e) =>
                  onChange("voice", {
                    ...config.voice,
                    rate: parseFloat(e.target.value) || 1.5,
                  })
                }
              />
            </Field>
            <Field label={t.assistant.avatarConfig.emotion}>
              <Select
                isSelected={(option) => option === config.voice?.emotion}
                options={Object.values(VoiceEmotion)}
                renderOption={(option) => option}
                value={config.voice?.emotion}
                onSelect={(option) =>
                  onChange("voice", { ...config.voice, emotion: option })
                }
              />
            </Field>
            <Field label={t.assistant.avatarConfig.model}>
              <Select
                isSelected={(option) => option === config.voice?.model}
                options={Object.values(ElevenLabsModel)}
                renderOption={(option) => option}
                value={config.voice?.model}
                onSelect={(option) =>
                  onChange("voice", { ...config.voice, model: option })
                }
              />
            </Field>
            <Field label={t.assistant.avatarConfig.provider}>
              <Input
                type="text"
                placeholder="en"
                value={config.sttSettings?.language || "en"}
                onChange={(e) =>
                  onChange("sttSettings", { ...config.sttSettings, language: e.target.value || "en" })
                }
              />
            </Field>
          </div>
          <h1 className="text-zinc-100 w-full text-center mt-4 text-lg font-bold">
            {t.assistant.avatarConfig.sttSettings}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label={t.assistant.avatarConfig.provider}>
              <Select
                isSelected={(option) => option === config.sttSettings?.provider}
                options={Object.values(STTProvider)}
                renderOption={(option) => option}
                value={config.sttSettings?.provider}
                onSelect={(option) =>
                  onChange("sttSettings", {
                    ...config.sttSettings,
                    provider: option,
                  })
                }
              />
            </Field>
          </div>
        </>
      )}
      <button
        className="text-zinc-400 text-sm cursor-pointer w-full text-center bg-transparent hover:text-white"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? t.assistant.avatarConfig.showLess : t.assistant.avatarConfig.showMore}
      </button>
    </div>
  );
};
