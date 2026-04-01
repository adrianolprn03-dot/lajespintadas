"use client";

import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import styles from "./BannerPNTP.module.css";

export default function BannerPNTP() {
    return (
        <div className={styles.bannerWrapper}>
            <div className={styles.bannerCard}>
                {/* Decorative Elements */}
                <div className={styles.blurCircle} />
                
                <div className={styles.bannerContent}>
                    <div className={styles.infoGroup}>
                        <div className={styles.iconBox}>
                            <Info size={24} />
                        </div>
                        
                        <div className={styles.textGroup}>
                            <h2 className={styles.title}>
                                Transparência Ativa <span>PNTP 2025</span>
                            </h2>
                            <p className={styles.description}>
                                Dados disponibilizados em conformidade com o Programa Nacional de Transparência Pública. Acesso em formatos abertos e acessíveis conforme a LAI.
                            </p>
                        </div>
                    </div>

                    <div className={styles.actionGroup}>
                        <Link href="/e-sic" className={styles.btnAction}>
                            Solicitar via e-SIC <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
