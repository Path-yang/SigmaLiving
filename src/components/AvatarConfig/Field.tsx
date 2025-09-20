interface FieldProps {
  label: string;
  children: React.ReactNode;
  tooltip?: string;
}

export const Field = (props: FieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-zinc-400 text-lg font-medium">{props.label}</label>
      {props.children}
    </div>
  );
};
