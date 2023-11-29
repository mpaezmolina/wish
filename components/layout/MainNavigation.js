import React from "react";
import Link from "next/link";

function MainNavigation() {
  return (
    <div className="header">
      <table style={{ width: "100%" }}>
        <tbody>
          <tr>
            <td style={{ width: "33.33%" }}></td>
            <td style={{ width: "33.33%" }}>
              <Link href="/">
                <h1 style={{ cursor: "pointer" }}>Gangs</h1>
              </Link>
            </td>
            <td style={{ width: "33.33%", textAlign: "right" }}>
              <img
                src="/images/hambur.png"
                style={{ marginRight: "20px" }}
              ></img>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MainNavigation;
