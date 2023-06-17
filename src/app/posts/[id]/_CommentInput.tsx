'use client';

import { CaretDown } from '@/assets/icons';
import { Button, Input } from '@/components';
import clsx from 'clsx';
import { useState } from 'react';

const _CommentInput = () => {
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    return (
        <>
            <Button
                fluid
                variant="secondary"
                onClick={() => setIsCommentOpen((prev) => !prev)}
            >
                Comment{' '}
                <CaretDown
                    className={clsx(
                        'inline-block transition-all duration-300 ease-in-out',
                        isCommentOpen && '-rotate-180'
                    )}
                />
            </Button>
            {isCommentOpen && (
                <div>
                    <Input
                        fluid
                        variant="secondary"
                        filled
                        placeholder="Write down what comes into your mind"
                    />
                </div>
            )}
        </>
    );
};

export default _CommentInput;
