type AlertMessageProps = {
  message: string;
};

export function AlertMessage({ message }: AlertMessageProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
}
