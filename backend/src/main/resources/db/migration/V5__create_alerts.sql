CREATE TABLE IF NOT EXISTS alerts (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    account_id BIGINT,

    reference_id BIGINT,

    reference_type VARCHAR(30),

    alert_type VARCHAR(30) NOT NULL,
    -- CREDIT_CARD / RECURRING_PAYMENT / GENERAL

    message TEXT NOT NULL,

    alert_date DATE NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    -- PENDING / READ / DISMISSED

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_alerts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_alerts_account
        FOREIGN KEY (account_id)
        REFERENCES accounts(id)
        ON DELETE SET NULL
);

CREATE INDEX idx_alerts_user_id
ON alerts(user_id);

CREATE INDEX idx_alerts_alert_date
ON alerts(alert_date);

