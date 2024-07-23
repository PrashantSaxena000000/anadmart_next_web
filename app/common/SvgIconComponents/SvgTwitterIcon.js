import React from "react";

const SvgTwitterIcon = () => {
  return (
    <div>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="22" cy="22" r="22" fill="#4DBA4D" />
        <circle cx="22" cy="22" r="22" fill="#4DBA4D" />
        <g clipPath="url(#clip0_1833_4185)">
          <mask
            id="mask0_1833_4185"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="13"
            y="13"
            width="18"
            height="19"
          >
            <path d="M31 13H13V31.405H31V13Z" fill="white" />
          </mask>
          <g mask="url(#mask0_1833_4185)">
            <path
              d="M23.7124 20.7893L30.4133 13H28.8254L23.0071 19.7633L18.3599 13H13L20.0274 23.2273L13 31.3955H14.588L20.7324 24.2533L25.6401 31.3955H31L23.7121 20.7893H23.7124ZM21.5375 23.3174L20.8255 22.299L15.1602 14.1954H17.5992L22.1712 20.7353L22.8832 21.7537L28.8262 30.2545H26.3871L21.5375 23.3178V23.3174Z"
              fill="white"
            />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1833_4185">
            <rect
              width="18"
              height="18.405"
              fill="white"
              transform="translate(13 13)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default SvgTwitterIcon;
