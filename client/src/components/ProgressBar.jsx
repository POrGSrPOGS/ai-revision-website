export default function progressBar({ title, progress = 0, theme }) {
  progress = Math.min(progress, 1);
  const percentage = Math.round(progress * 100);

  const themes = {
    red: {
      bg: "bg-red-700",
      fill: "bg-red-500",
      text: "text-red-600",
      border: "border-red-600",
    },
    blue: {
      bg: "bg-blue-700",
      fill: "bg-blue-500",
      text: "text-blue-600",
      border: "border-blue-600",
    },
    green: {
      bg: "bg-green-700",
      fill: "bg-green-500",
      text: "text-green-600",
      border: "border-green-600",
    },
    purple: {
      bg: "bg-purple-700",
      fill: "bg-purple-500",
      text: "text-purple-600",
      border: "border-purple-600",
    },
  };

  const themeStyles = themes[theme] ?? themes.green;

  return (
    <div
      className={`w-100 flex items-center gap-5 ${themeStyles.border} border-1 p-2 rounded-lg m-3`}
    >
      <div className={`text-left w-40 text-xl ${themeStyles.text}`}> {title} </div>
      <div className={`text-right w-10 text-xl ${themeStyles.text}`}>
        {" "}
        {percentage}%{" "}
      </div>

      <div // bg
        className={`${themeStyles.bg}  flex-1 h-3 overflow-hidden rounded-lg`}
      >
        <div // bar
          className={`h-full ${themeStyles.fill}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
