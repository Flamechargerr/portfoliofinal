import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Anamay Tripathy - Data Science Engineer & Full Stack Developer'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0d0d0d',
                    backgroundImage: 'radial-gradient(circle at 25% 25%, #1b1c11 0%, #0d0d0d 50%)',
                }}
            >
                {/* Accent bars */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        backgroundColor: '#c8f550',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '8px',
                        backgroundColor: '#c8f550',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        padding: '60px',
                    }}
                >
                    {/* Label */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            marginBottom: '24px',
                        }}
                    >
                        <div
                            style={{
                                width: '48px',
                                height: '2px',
                                backgroundColor: '#c8f550',
                            }}
                        />
                        <span
                            style={{
                                color: '#c8f550',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                letterSpacing: '4px',
                            }}
                        >
                            Portfolio
                        </span>
                        <div
                            style={{
                                width: '48px',
                                height: '2px',
                                backgroundColor: '#c8f550',
                            }}
                        />
                    </div>

                    {/* Name */}
                    <h1
                        style={{
                            color: '#f4f4f0',
                            fontSize: '72px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '-2px',
                            marginBottom: '16px',
                            lineHeight: 1,
                        }}
                    >
                        ANAMAY TRIPATHY
                    </h1>

                    {/* Role */}
                    <p
                        style={{
                            color: '#c8f550',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            marginBottom: '32px',
                        }}
                    >
                        Data Science Engineer & Full Stack Developer
                    </p>

                    {/* Stats */}
                    <div
                        style={{
                            display: 'flex',
                            gap: '48px',
                            marginTop: '24px',
                        }}
                    >
                        {[
                            { value: '15+', label: 'Projects' },
                            { value: '570+', label: 'Commits' },
                            { value: '8+', label: 'Certifications' },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <span
                                    style={{
                                        color: '#c8f550',
                                        fontSize: '36px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {stat.value}
                                </span>
                                <span
                                    style={{
                                        color: '#f4f4f080',
                                        fontSize: '14px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '2px',
                                    }}
                                >
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Corner decorations */}
                <div
                    style={{
                        position: 'absolute',
                        top: '32px',
                        left: '32px',
                        width: '48px',
                        height: '48px',
                        borderTop: '3px solid #c8f550',
                        borderLeft: '3px solid #c8f550',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '32px',
                        right: '32px',
                        width: '48px',
                        height: '48px',
                        borderBottom: '3px solid #c8f550',
                        borderRight: '3px solid #c8f550',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
