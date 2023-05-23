
export default function Shimmer() {
  return (
    <div
      style={{
        marginTop: "20px",
        width: "90%",
        height: "50vh",
        background: "white",
        borderRadius: "20px",
        opacity: "45%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      className="parent"
    >
      <div
        style={{
          width: "80%",
          height: "15vh",
          background: "gray",
          opacity: "40%",
          borderRadius: "10px",
          marginTop: "10px",
        }}
        className="shine"
      ></div>
      <div
        style={{
        width : '100%',
        height : '100%',
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          marginTop : '20px'
        }}
      >
        <div
          style={{
            width: "30%",
            height: "30vh",
            background: "gray",
            opacity: "50%",
            borderRadius: "20px",
          }}
          className="shine"
        >
        </div>
        <div
            style={{
              width: "60%",
              height: "30vh",
              background: "gray",
              opacity: "50%",
              borderRadius: "20px",
            }}
            className="shine"
          ></div>
      </div>
    </div>
  );
}
